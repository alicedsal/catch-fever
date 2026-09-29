create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  class_year int check (class_year between 2020 and 2035),
  bio text check (char_length(bio) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- lock the table: nobody can read or write rows unless a policy allows it
alter table public.profiles enable row level security;

-- let logged-in users reach the table at all (new tables start hidden)
grant select, insert, update on public.profiles to authenticated;

-- each user can only see and change their own row
create policy "users can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "users can create their own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);