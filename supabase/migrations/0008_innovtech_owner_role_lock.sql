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

  if old.role <> 'owner' and new.role = 'owner' then
    raise exception 'Un collaborateur ne peut pas être élevé au rôle propriétaire.';
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
