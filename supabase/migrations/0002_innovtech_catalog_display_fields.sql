alter table public.innovtech_catalog_products add column if not exists icon text not null default 'Watch';
alter table public.innovtech_catalog_products add column if not exists badge_fr text not null default '';
alter table public.innovtech_catalog_products add column if not exists badge_en text not null default '';
alter table public.innovtech_catalog_products add column if not exists search_terms_fr jsonb not null default '[]'::jsonb;
alter table public.innovtech_catalog_products add column if not exists search_terms_en jsonb not null default '[]'::jsonb;
