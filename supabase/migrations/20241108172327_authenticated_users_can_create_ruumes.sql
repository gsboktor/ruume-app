drop policy if exists "owners can create their ruumes" on ruumes;

create policy "authenticated users can create ruumes"
on ruumes for insert with check((select id from profiles where profiles.user_id = auth.uid()) is not null);