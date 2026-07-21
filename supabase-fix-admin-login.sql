-- ============================================================
-- Atualização: login fixo no site (sem Supabase Auth)
--
-- Como usar (projeto Já existente):
-- 1. Abra o painel do Supabase → SQL Editor
-- 2. Cole este script e clique em Run
-- ============================================================

drop policy if exists "config_update_admin" on site_config;
create policy "config_update_admin"
  on site_config for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "agendamento_select_admin" on appointments;
create policy "agendamento_select_admin"
  on appointments for select
  to anon, authenticated
  using (true);

drop policy if exists "agendamento_delete_admin" on appointments;
create policy "agendamento_delete_admin"
  on appointments for delete
  to anon, authenticated
  using (true);
