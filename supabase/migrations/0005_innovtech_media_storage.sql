-- Durable media metadata and storage policies for InnovTech Admin.
create table if not exists public.innovtech_media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null unique,
  content_type text not null,
  public_url text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.innovtech_media_assets enable row level security;

drop policy if exists "innovtech_media_public_read" on public.innovtech_media_assets;
create policy "innovtech_media_public_read"
  on public.innovtech_media_assets for select
  using (true);

drop policy if exists "innovtech_media_admin_write" on public.innovtech_media_assets;
create policy "innovtech_media_admin_write"
  on public.innovtech_media_assets for all to authenticated
  using (public.is_innovtech_admin())
  with check (public.is_innovtech_admin());

insert into storage.buckets (id, name, public)
values ('innovtech-media', 'innovtech-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "innovtech_media_storage_public_read" on storage.objects;
create policy "innovtech_media_storage_public_read"
  on storage.objects for select
  using (bucket_id = 'innovtech-media');

drop policy if exists "innovtech_media_storage_admin_insert" on storage.objects;
create policy "innovtech_media_storage_admin_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'innovtech-media' and public.is_innovtech_admin());

drop policy if exists "innovtech_media_storage_admin_update" on storage.objects;
create policy "innovtech_media_storage_admin_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'innovtech-media' and public.is_innovtech_admin())
  with check (bucket_id = 'innovtech-media' and public.is_innovtech_admin());

drop policy if exists "innovtech_media_storage_admin_delete" on storage.objects;
create policy "innovtech_media_storage_admin_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'innovtech-media' and public.is_innovtech_admin());

comment on table public.innovtech_media_assets is 'Inventaire des médias ajoutés depuis InnovTech Admin; les octets sont stockés dans Supabase Storage.';
