create table profiles (
    id uuid primary key,
    user_id uuid references auth.users not null,
    avatar_url text,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

alter table profiles enable row level security;

create policy "Profile is viewable by authenticated users"
on profiles for select
to authenticated
using (true);

create policy "Profile created by user"
on profiles for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Profile updated by user"
on profiles for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Profile deleted by user"
on profiles for delete
to authenticated
using ((select auth.uid()) = user_id);