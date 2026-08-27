begin;

-- Collaboration: the owner retains full control while each member receives a minimal role.
alter table public.innovtech_admins
  add column if not exists role text not null default 'viewer' check (role in ('owner', 'catalog_manager', 'sales', 'viewer')),
  add column if not exists active boolean not null default true,
  add column if not exists display_name text not null default '',
  add column if not exists invited_by uuid references auth.users(id) on delete set null,
  add column if not exists invited_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

update public.innovtech_admins
set role = 'owner', active = true
where lower(email) = 'evansabah2006@gmail.com';

create or replace function public.innovtech_current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.innovtech_admins
  where user_id = auth.uid() and active = true
  limit 1;
$$;

create or replace function public.has_innovtech_permission(required_permission text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case public.innovtech_current_role()
    when 'owner' then true
    when 'catalog_manager' then required_permission = any(array[
      'dashboard_read', 'catalog_read', 'catalog_manage', 'media_manage', 'categories_manage', 'promotions_manage'
    ])
    when 'sales' then required_permission = any(array[
      'dashboard_read', 'catalog_read', 'requests_read', 'requests_manage'
    ])
    when 'viewer' then required_permission = any(array['dashboard_read', 'catalog_read'])
    else false
  end;
$$;

create or replace function public.is_innovtech_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.innovtech_admins
    where user_id = auth.uid() and active = true
  );
$$;

create or replace function public.protect_innovtech_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    if old.role = 'owner' then
      raise exception 'Le rôle propriétaire InnovTech ne peut pas être supprimé.';
    end if;
    return old;
  end if;

  if old.role = 'owner' and (new.role <> 'owner' or new.active is not true) then
    raise exception 'Le rôle propriétaire InnovTech doit rester actif.';
  end if;

  if lower(old.email) = 'evansabah2006@gmail.com' and lower(new.email) <> lower(old.email) then
    raise exception 'L’e-mail propriétaire InnovTech ne peut pas être modifié ici.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists protect_innovtech_owner on public.innovtech_admins;
create trigger protect_innovtech_owner
before update or delete on public.innovtech_admins
for each row execute function public.protect_innovtech_owner();

create or replace function public.grant_innovtech_owner_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(coalesce(new.email, '')) = 'evansabah2006@gmail.com' then
    insert into public.innovtech_admins (user_id, email, role, active)
    values (new.id, new.email, 'owner', true)
    on conflict (user_id) do update
      set email = excluded.email,
          role = 'owner',
          active = true,
          updated_at = now();
  end if;
  return new;
end;
$$;

-- Product operations: stock and promotions stay synchronized with the public catalogue.
alter table public.innovtech_catalog_products
  add column if not exists stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  add column if not exists promotion_enabled boolean not null default false,
  add column if not exists promotion_price_label text not null default '',
  add column if not exists promotion_price_label_en text not null default '',
  add column if not exists promotion_starts_at timestamptz,
  add column if not exists promotion_ends_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'innovtech_promotion_period_is_valid'
      and conrelid = 'public.innovtech_catalog_products'::regclass
  ) then
    alter table public.innovtech_catalog_products
      add constraint innovtech_promotion_period_is_valid
      check (promotion_starts_at is null or promotion_ends_at is null or promotion_starts_at <= promotion_ends_at);
  end if;
end;
$$;

-- Categories are independent so they can be renamed, reordered or hidden without a code deploy.
create table if not exists public.innovtech_catalog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_en text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.innovtech_catalog_categories (slug, name_fr, name_en, sort_order)
values
  ('security', 'Sécurité', 'Security', 0),
  ('tracking', 'GPS', 'GPS tracking', 1),
  ('drones', 'Drones', 'Drones', 2),
  ('agriculture', 'Robotique agricole', 'Agricultural robotics', 3),
  ('computing', 'Informatique', 'Computing', 4),
  ('wearables', 'Lunettes', 'Wearables', 5),
  ('home', 'Maison', 'Home', 6)
on conflict (slug) do nothing;

drop trigger if exists innovtech_categories_updated_at on public.innovtech_catalog_categories;
create trigger innovtech_categories_updated_at
before update on public.innovtech_catalog_categories
for each row execute function public.set_innovtech_updated_at();

-- WhatsApp requests are intentionally manual records: no customer data is fabricated or collected automatically.
create table if not exists public.innovtech_customer_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null default 'order' check (request_type in ('order', 'quote', 'appointment', 'question')),
  status text not null default 'new' check (status in ('new', 'contacted', 'in_discussion', 'confirmed', 'fulfilled', 'cancelled')),
  customer_name text not null default '',
  customer_phone text not null default '',
  customer_email text not null default '',
  product_id uuid references public.innovtech_catalog_products(id) on delete set null,
  product_name text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  source text not null default 'whatsapp' check (source in ('whatsapp', 'website', 'manual')),
  internal_notes text not null default '',
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists innovtech_customer_requests_status_created_at_idx
  on public.innovtech_customer_requests (status, created_at desc);

drop trigger if exists innovtech_customer_requests_updated_at on public.innovtech_customer_requests;
create trigger innovtech_customer_requests_updated_at
before update on public.innovtech_customer_requests
for each row execute function public.set_innovtech_updated_at();

-- Replace the broad single-admin policies with explicit permissions for the team roles.
drop policy if exists "innovtech_admin_self_read" on public.innovtech_admins;
drop policy if exists "InnovTech administrators read their role" on public.innovtech_admins;
drop policy if exists "InnovTech team can view roles" on public.innovtech_admins;
drop policy if exists "InnovTech owner updates collaborators" on public.innovtech_admins;
drop policy if exists "InnovTech owner removes collaborators" on public.innovtech_admins;
create policy "InnovTech team can view roles"
  on public.innovtech_admins for select to authenticated
  using (user_id = auth.uid() or public.has_innovtech_permission('collaborators_manage'));
create policy "InnovTech owner updates collaborators"
  on public.innovtech_admins for update to authenticated
  using (public.has_innovtech_permission('collaborators_manage'))
  with check (public.has_innovtech_permission('collaborators_manage'));
create policy "InnovTech owner removes collaborators"
  on public.innovtech_admins for delete to authenticated
  using (public.has_innovtech_permission('collaborators_manage'));

drop policy if exists "innovtech_catalog_public_read" on public.innovtech_catalog_products;
drop policy if exists "Published InnovTech products are public" on public.innovtech_catalog_products;
drop policy if exists "innovtech_catalog_admin_write" on public.innovtech_catalog_products;
drop policy if exists "InnovTech administrators manage catalog" on public.innovtech_catalog_products;
drop policy if exists "InnovTech team reads catalog" on public.innovtech_catalog_products;
drop policy if exists "InnovTech catalog managers write products" on public.innovtech_catalog_products;
create policy "InnovTech team reads catalog"
  on public.innovtech_catalog_products for select
  using (status = 'published' or public.has_innovtech_permission('catalog_read'));
create policy "InnovTech catalog managers write products"
  on public.innovtech_catalog_products for all to authenticated
  using (public.has_innovtech_permission('catalog_manage'))
  with check (public.has_innovtech_permission('catalog_manage'));

alter table public.innovtech_catalog_categories enable row level security;
drop policy if exists "InnovTech categories are public" on public.innovtech_catalog_categories;
drop policy if exists "InnovTech catalog managers manage categories" on public.innovtech_catalog_categories;
create policy "InnovTech categories are public"
  on public.innovtech_catalog_categories for select
  using (active or public.has_innovtech_permission('categories_manage'));
create policy "InnovTech catalog managers manage categories"
  on public.innovtech_catalog_categories for all to authenticated
  using (public.has_innovtech_permission('categories_manage'))
  with check (public.has_innovtech_permission('categories_manage'));

alter table public.innovtech_customer_requests enable row level security;
drop policy if exists "InnovTech sales reads requests" on public.innovtech_customer_requests;
drop policy if exists "InnovTech sales manages requests" on public.innovtech_customer_requests;
create policy "InnovTech sales reads requests"
  on public.innovtech_customer_requests for select to authenticated
  using (public.has_innovtech_permission('requests_read'));
create policy "InnovTech sales manages requests"
  on public.innovtech_customer_requests for all to authenticated
  using (public.has_innovtech_permission('requests_manage'))
  with check (public.has_innovtech_permission('requests_manage'));

drop policy if exists "innovtech_media_admin_write" on public.innovtech_media_assets;
drop policy if exists "InnovTech media managers write" on public.innovtech_media_assets;
create policy "InnovTech media managers write"
  on public.innovtech_media_assets for all to authenticated
  using (public.has_innovtech_permission('media_manage'))
  with check (public.has_innovtech_permission('media_manage'));

drop policy if exists "innovtech_media_storage_admin_insert" on storage.objects;
drop policy if exists "innovtech_media_storage_admin_update" on storage.objects;
drop policy if exists "innovtech_media_storage_admin_delete" on storage.objects;
drop policy if exists "InnovTech media managers upload" on storage.objects;
drop policy if exists "InnovTech media managers update" on storage.objects;
drop policy if exists "InnovTech media managers delete" on storage.objects;
create policy "InnovTech media managers upload"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'innovtech-media' and public.has_innovtech_permission('media_manage'));
create policy "InnovTech media managers update"
  on storage.objects for update to authenticated
  using (bucket_id = 'innovtech-media' and public.has_innovtech_permission('media_manage'))
  with check (bucket_id = 'innovtech-media' and public.has_innovtech_permission('media_manage'));
create policy "InnovTech media managers delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'innovtech-media' and public.has_innovtech_permission('media_manage'));

drop policy if exists "innovtech_settings_admin_write" on public.innovtech_site_settings;
drop policy if exists "InnovTech administrators manage settings" on public.innovtech_site_settings;
drop policy if exists "InnovTech owner manages settings" on public.innovtech_site_settings;
create policy "InnovTech owner manages settings"
  on public.innovtech_site_settings for all to authenticated
  using (public.has_innovtech_permission('settings_manage'))
  with check (public.has_innovtech_permission('settings_manage'));

commit;
