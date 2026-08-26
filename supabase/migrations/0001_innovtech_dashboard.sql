create table if not exists public.innovtech_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.innovtech_catalog_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_en text not null,
  category text not null,
  description_fr text not null default '',
  description_en text not null default '',
  price_label text not null default 'Prix à définir',
  image_url text not null default '',
  status text not null default 'draft' check (status in ('draft','published','hidden')),
  availability_status text not null default 'on_request',
  availability_note_fr text not null default '',
  availability_note_en text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.innovtech_site_settings (
  setting_key text primary key,
  setting_value text not null,
  updated_at timestamptz not null default now()
);

create or replace function public.is_innovtech_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.innovtech_admins where user_id = auth.uid());
$$;

create or replace function public.set_innovtech_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists innovtech_catalog_updated_at on public.innovtech_catalog_products;
create trigger innovtech_catalog_updated_at before update on public.innovtech_catalog_products for each row execute function public.set_innovtech_updated_at();
drop trigger if exists innovtech_settings_updated_at on public.innovtech_site_settings;
create trigger innovtech_settings_updated_at before update on public.innovtech_site_settings for each row execute function public.set_innovtech_updated_at();

create or replace function public.grant_innovtech_owner_admin() returns trigger language plpgsql security definer set search_path = public as $$ begin
  if lower(coalesce(new.email, '')) = 'evansabah2006@gmail.com' then insert into public.innovtech_admins(user_id) values (new.id) on conflict do nothing; end if;
  return new;
end; $$;
drop trigger if exists on_auth_user_created_innovtech_admin on auth.users;
create trigger on_auth_user_created_innovtech_admin after insert on auth.users for each row execute procedure public.grant_innovtech_owner_admin();

alter table public.innovtech_admins enable row level security;
alter table public.innovtech_catalog_products enable row level security;
alter table public.innovtech_site_settings enable row level security;
create policy "innovtech_admin_self_read" on public.innovtech_admins for select to authenticated using (auth.uid() = user_id);
create policy "innovtech_catalog_public_read" on public.innovtech_catalog_products for select using (status = 'published');
create policy "innovtech_catalog_admin_write" on public.innovtech_catalog_products for all to authenticated using (public.is_innovtech_admin()) with check (public.is_innovtech_admin());
create policy "innovtech_settings_public_read" on public.innovtech_site_settings for select using (true);
create policy "innovtech_settings_admin_write" on public.innovtech_site_settings for all to authenticated using (public.is_innovtech_admin()) with check (public.is_innovtech_admin());
