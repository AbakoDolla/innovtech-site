alter table public.innovtech_catalog_products add column if not exists price_label_en text not null default 'Price to be set';
comment on column public.innovtech_catalog_products.price_label_en is 'Étiquette de prix affichée dans la version anglaise du catalogue public.';
