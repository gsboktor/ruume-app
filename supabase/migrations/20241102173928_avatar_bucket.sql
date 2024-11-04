insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict do nothing;

create policy "Avatar is viewable by all authenticated users"
on storage.objects for select
to authenticated
using (bucket_id = 'avatars');

create policy "Avatar is insertable by authenticated user"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars');

create policy "Avatar is updatable by authenticated user"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "Avatar is deletable by authenticated user"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
