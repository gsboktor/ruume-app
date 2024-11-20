create table ruumes (
    id uuid primary key default uuid_generate_v4(),
    owner_id uuid references profiles(id) on delete cascade not null,
    name text not null,
    description text,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    anthem text,
    anthem_url text
);

create table ruume_members (
    id uuid primary key default uuid_generate_v4(),
    ruume_id uuid references ruumes(id) on delete cascade not null,
    member_id uuid references profiles(id) on delete cascade not null,
    joined_at timestamp with time zone default now() not null,
    unique(ruume_id, member_id)
);

alter table ruumes enable row level security;
alter table ruume_members enable row level security;

create policy "owners can create their ruumes"
on ruumes for insert with check(owner_id in (select id from profiles where profiles.user_id = auth.uid()));

create policy "owners can update their ruumes"
on ruumes for update 
with check(owner_id in (select id from profiles where profiles.user_id = auth.uid()));

create policy "owners can delete their ruumes"
on ruumes for delete 
using(owner_id in (
    select id from profiles 
    where profiles.user_id = auth.uid()
));

create policy "members can read ruumes"
on ruumes for select using((
    exists(select 1 from ruume_members 
    join profiles on ruume_members.member_id = profiles.id 
    where ruume_members.ruume_id = ruumes.id and profiles.user_id = auth.uid())
));

create policy "members can remove themselves from ruumes"
on ruume_members for delete using(member_id in (select id from profiles where profiles.user_id = auth.uid()));

create policy "owners can remove members from their ruumes"
on ruume_members for delete using((
    exists(select 1 from ruumes 
    where ruumes.id = ruume_members.ruume_id 
    and ruumes.owner_id = (
        select id from profiles 
        where profiles.user_id = auth.uid()
    ))
));