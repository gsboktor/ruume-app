alter table profiles drop constraint if exists profiles_user_id_fkey;
alter table profiles add constraint profiles_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade;