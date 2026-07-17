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
