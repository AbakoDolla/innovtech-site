-- Product-level media references used by InnovTech Admin and the public storefront.
alter table public.innovtech_catalog_products
  add column if not exists gallery_urls jsonb not null default '[]'::jsonb;

alter table public.innovtech_catalog_products
  add column if not exists video_urls jsonb not null default '[]'::jsonb;

comment on column public.innovtech_catalog_products.gallery_urls is 'URLs publiques des images supplémentaires liées au produit.';
comment on column public.innovtech_catalog_products.video_urls is 'URLs publiques des vidéos liées au produit.';
