create or replace function public.hook_restrict_signup_to_unc(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  user_email text := lower(event->'user'->>'email');
begin
  -- allow unc.edu and any subdomain (live.unc.edu, email.unc.edu, ...)
  if user_email is null or user_email !~ '^[^@\s]+@([a-z0-9-]+\.)*unc\.edu$' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'only unc emails can sign up.'
      )
    );
  end if;
  return '{}'::jsonb;
end;
$$;

grant execute on function public.hook_restrict_signup_to_unc to supabase_auth_admin;
revoke execute on function public.hook_restrict_signup_to_unc from authenticated, anon, public;