import { validateCommentSubmission } from '../_shared/comments.ts';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

interface RuntimeEnvironment {
  supabaseUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  hashSecret: string;
}

function getRuntimeEnvironment(): RuntimeEnvironment | undefined {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const hashSecret = Deno.env.get('COMMENTS_HASH_SECRET');

  if (!supabaseUrl || !anonKey || !serviceRoleKey || !hashSecret) return undefined;
  return { supabaseUrl, anonKey, serviceRoleKey, hashSecret };
}

function getCorsHeaders(request: Request): HeadersInit | undefined {
  const origin = request.headers.get('origin');
  const allowedOrigins = (Deno.env.get('COMMENTS_ALLOWED_ORIGINS') ?? 'http://localhost:4321')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (!origin || !allowedOrigins.includes(origin)) return undefined;

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Origin',
  };
}

function jsonResponse(body: unknown, status: number, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-real-ip') ??
    forwardedFor ??
    `local:${request.headers.get('user-agent') ?? 'unknown'}`
  );
}

async function createIdentifierHash(identifier: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(identifier));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
}

function supabaseHeaders(key: string): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

async function readApprovedComments(
  requestUrl: URL,
  environment: RuntimeEnvironment,
  corsHeaders: HeadersInit,
): Promise<Response> {
  const postSlug = requestUrl.searchParams.get('post_slug')?.trim() ?? '';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(postSlug)) {
    return jsonResponse({ error: '게시글 경로가 올바르지 않습니다.' }, 400, corsHeaders);
  }

  const commentsUrl = new URL('/rest/v1/comments', environment.supabaseUrl);
  commentsUrl.searchParams.set('select', 'id,post_slug,author_name,content,created_at');
  commentsUrl.searchParams.set('post_slug', `eq.${postSlug}`);
  commentsUrl.searchParams.set('order', 'created_at.asc');
  commentsUrl.searchParams.set('limit', '100');

  const response = await fetch(commentsUrl, {
    headers: supabaseHeaders(environment.anonKey),
  });
  if (!response.ok) {
    return jsonResponse({ error: '댓글을 불러오지 못했습니다.' }, 502, corsHeaders);
  }

  const comments: unknown = await response.json();
  return jsonResponse(comments, 200, corsHeaders);
}

async function consumeRateLimit(
  keyHash: string,
  environment: RuntimeEnvironment,
): Promise<boolean> {
  const rateLimitUrl = new URL('/rest/v1/rpc/consume_comment_rate_limit', environment.supabaseUrl);
  const response = await fetch(rateLimitUrl, {
    method: 'POST',
    headers: supabaseHeaders(environment.serviceRoleKey),
    body: JSON.stringify({ p_key_hash: keyHash, p_window_seconds: 600, p_limit: 5 }),
  });
  if (!response.ok) return false;

  const result: unknown = await response.json();
  return result === true;
}

async function submitComment(
  request: Request,
  environment: RuntimeEnvironment,
  corsHeaders: HeadersInit,
): Promise<Response> {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > 10_000) {
    return jsonResponse({ error: '요청 크기가 너무 큽니다.' }, 413, corsHeaders);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: '요청 형식이 올바르지 않습니다.' }, 400, corsHeaders);
  }

  if (new TextEncoder().encode(rawBody).byteLength > 10_000) {
    return jsonResponse({ error: '요청 크기가 너무 큽니다.' }, 413, corsHeaders);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return jsonResponse({ error: '요청 형식이 올바르지 않습니다.' }, 400, corsHeaders);
  }

  const validation = validateCommentSubmission(payload);
  if (!validation.isValid) {
    if (validation.code === 'honeypot') {
      return jsonResponse({ status: 'pending' }, 202, corsHeaders);
    }
    return jsonResponse({ error: validation.message }, 400, corsHeaders);
  }

  const identifierHash = await createIdentifierHash(
    getClientIdentifier(request),
    environment.hashSecret,
  );
  if (!(await consumeRateLimit(identifierHash, environment))) {
    return jsonResponse({ error: '잠시 후 다시 시도해 주세요.' }, 429, {
      ...corsHeaders,
      'Retry-After': '600',
    });
  }

  const commentsUrl = new URL('/rest/v1/comments', environment.supabaseUrl);
  const response = await fetch(commentsUrl, {
    method: 'POST',
    headers: {
      ...supabaseHeaders(environment.serviceRoleKey),
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      post_slug: validation.value.postSlug,
      author_name: validation.value.authorName,
      content: validation.value.content,
      status: 'pending',
    }),
  });

  if (!response.ok) {
    return jsonResponse({ error: '댓글을 저장하지 못했습니다.' }, 502, corsHeaders);
  }

  return jsonResponse({ status: 'pending' }, 202, corsHeaders);
}

Deno.serve(async (request) => {
  const corsHeaders = getCorsHeaders(request);
  if (!corsHeaders) return jsonResponse({ error: '허용되지 않은 요청입니다.' }, 403);
  if (request.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders });

  const environment = getRuntimeEnvironment();
  if (!environment) {
    return jsonResponse({ error: '댓글 서비스 설정이 완료되지 않았습니다.' }, 503, corsHeaders);
  }

  if (request.method === 'GET') {
    return readApprovedComments(new URL(request.url), environment, corsHeaders);
  }
  if (request.method === 'POST') {
    return submitComment(request, environment, corsHeaders);
  }
  return jsonResponse({ error: '지원하지 않는 요청입니다.' }, 405, corsHeaders);
});
