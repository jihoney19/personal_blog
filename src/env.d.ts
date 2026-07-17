/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_COMMENTS_ENABLED?: string;
  readonly PUBLIC_SUPABASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
