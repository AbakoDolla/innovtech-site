revoke all on table public.innovtech_admins from anon;
revoke all on table public.innovtech_customer_requests from anon;

grant select, insert, update, delete on table public.innovtech_admins to authenticated;
grant select, insert, update, delete on table public.innovtech_customer_requests to authenticated;
