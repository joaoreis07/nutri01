-- Adiciona data de nascimento apenas como coluna nova.
-- Não altera pacientes já cadastrados, horários, dias bloqueados nem serviços.
alter table appointments
  add column if not exists birth_date date;
