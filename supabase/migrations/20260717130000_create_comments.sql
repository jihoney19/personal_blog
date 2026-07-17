create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author_name text not null,
  content text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  constraint comments_post_slug_format check (
    post_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  constraint comments_author_name_length check (
    char_length(author_name) between 2 and 40
  ),
  constraint comments_content_length check (
    char_length(content) between 2 and 2000
  ),
  constraint comments_status_values check (
    status in ('pending', 'approved', 'rejected', 'spam')
  )
);

create index comments_public_post_created_idx
  on public.comments (post_slug, created_at asc)
  where status = 'approved';

create index comments_moderation_status_created_idx
  on public.comments (status, created_at asc);

create or replace function public.set_comment_approval_timestamp()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'approved' then
    if tg_op = 'INSERT' or old.status <> 'approved' or new.approved_at is null then
      new.approved_at := now();
    end if;
  else
    new.approved_at := null;
  end if;

  return new;
end;
$$;

create trigger set_comment_approval_timestamp_before_write
  before insert or update of status, approved_at
  on public.comments
  for each row
  execute function public.set_comment_approval_timestamp();

revoke all on function public.set_comment_approval_timestamp() from public;

alter table public.comments enable row level security;

revoke all on table public.comments from anon, authenticated;
grant select on table public.comments to anon, authenticated;

create policy "Public can read approved comments"
  on public.comments
  for select
  to anon, authenticated
  using (status = 'approved');

create table public.comment_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1,
  constraint comment_rate_limits_key_hash_length check (
    char_length(key_hash) = 64
  ),
  constraint comment_rate_limits_request_count_positive check (
    request_count > 0
  )
);

create index comment_rate_limits_window_started_idx
  on public.comment_rate_limits (window_started_at);

alter table public.comment_rate_limits enable row level security;
revoke all on table public.comment_rate_limits from anon, authenticated;

create or replace function public.consume_comment_rate_limit(
  p_key_hash text,
  p_window_seconds integer default 600,
  p_limit integer default 5
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  request_time timestamptz := now();
  window_duration interval := make_interval(secs => greatest(p_window_seconds, 1));
begin
  if char_length(p_key_hash) <> 64 then
    raise exception 'Invalid rate-limit key';
  end if;

  delete from public.comment_rate_limits
  where window_started_at < request_time - interval '1 day';

  insert into public.comment_rate_limits as limits (
    key_hash,
    window_started_at,
    request_count
  )
  values (
    p_key_hash,
    request_time,
    1
  )
  on conflict (key_hash) do update
  set
    window_started_at = case
      when limits.window_started_at + window_duration <= request_time then request_time
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at + window_duration <= request_time then 1
      else limits.request_count + 1
    end
  returning request_count into current_count;

  return current_count <= greatest(p_limit, 1);
end;
$$;

revoke all on function public.consume_comment_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_comment_rate_limit(text, integer, integer)
  to service_role;

comment on table public.comments is
  'Reader comments. Only approved rows are publicly readable.';
comment on table public.comment_rate_limits is
  'Short-lived HMAC identifiers used to limit anonymous comment submissions.';
