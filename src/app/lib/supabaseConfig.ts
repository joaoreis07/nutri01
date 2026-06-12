// Configuração do Supabase (banco de dados online).
//
// Para ativar:
// 1. Crie um projeto gratuito em https://supabase.com
// 2. No painel do projeto, vá em Settings -> API
// 3. Copie a "Project URL" e a chave "anon public" e cole abaixo
//
// Enquanto estes campos estiverem vazios, o site funciona em modo local
// (dados salvos apenas no navegador de cada pessoa).
//
// A chave "anon public" é pública por design — a segurança é garantida
// pelas regras de acesso (RLS) criadas pelo script supabase-setup.sql.

export const SUPABASE_URL = 'https://sbzoaddqidhsawujrszm.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiem9hZGRxaWRoc2F3dWpyc3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjI5NjAsImV4cCI6MjA5Njc5ODk2MH0.R7uhBgvCevxRoMlcZTyHj5TgRSdh5EWxvwC13XHClEo';
