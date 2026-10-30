-- 피드백 표 만들기. Supabase 대시보드 → SQL Editor 에 붙여 넣고 Run 한 번.
-- 여행 기록장과 같은 프로젝트(vqmdcyoldsosvonlagdv)에서 실행하세요.
-- 누구나 '쓰기'만 할 수 있고, 읽기·수정·삭제는 대시보드(웅)만 할 수 있어요.

create table if not exists public.feedback (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  app         text not null check (app in ('launchpad','travel-log','langsplit','unse-jumak','diamond','same-age')),
  kind        text not null default 'other' check (kind in ('bug','idea','praise','other')),
  message     text not null check (char_length(message) between 1 and 2000),
  contact     text check (contact is null or char_length(contact) <= 200),
  lang        text check (lang is null or char_length(lang) <= 10),
  page        text check (page is null or char_length(page) <= 300)
);

alter table public.feedback enable row level security;

drop policy if exists "anyone can send feedback" on public.feedback;
create policy "anyone can send feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (true);

-- select / update / delete 정책은 일부러 만들지 않아요 → 웹에서는 아무도 읽을 수 없음.

-- 피드백 보기: Table Editor → feedback, 또는
-- select created_at, app, kind, message, contact from public.feedback order by created_at desc;
