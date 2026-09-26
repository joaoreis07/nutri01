import { SUPABASE_ANON_KEY, SUPABASE_URL } from './supabasePublic.js';

const NOTIFY_EMAIL = 'naraorossetto@gmail.com';
const RESEND_FROM = 'Agenda Nara Rossetto <onboarding@resend.dev>';
const FRESH_MS = 20 * 60 * 1000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { sent: false });
  }

  let appointmentId = '';
  try {
    appointmentId = String(JSON.parse(event.body || '{}').id || '');
  } catch {
    return json(400, { sent: false });
  }
  if (!UUID_RE.test(appointmentId)) {
    return json(400, { sent: false });
  }

  const appointment = await loadAppointment(appointmentId);
  if (!appointment) return json(200, { sent: false, reason: 'not_found' });

  const createdAt = new Date(appointment.created_at).getTime();
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > FRESH_MS) {
    return json(200, { sent: false, reason: 'stale' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(200, { sent: false, reason: 'missing_key' });

  const message = buildBookingEmail(appointment);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [NOTIFY_EMAIL],
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) return json(200, { sent: false, reason: 'provider' });
  return json(200, { sent: true });
};

async function loadAppointment(id) {
  const url = new URL('/rest/v1/appointments', SUPABASE_URL);
  url.searchParams.set('id', `eq.${id}`);
  url.searchParams.set('select', 'name,whatsapp,email,birth_date,objective,service,price,date,time,created_at');
  url.searchParams.set('limit', '1');

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!response.ok) return null;
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] ?? null : null;
}

export function buildBookingEmail(appointment) {
  const name = String(appointment.name || '').trim();
  const date = formatDate(appointment.date);
  const time = String(appointment.time || '').slice(0, 5);
  const lines = [
    ['Paciente', name],
    ['Data de nascimento', appointment.birth_date ? formatDate(appointment.birth_date) : ''],
    ['WhatsApp', appointment.whatsapp],
    ['E-mail', appointment.email],
    ['Serviço', appointment.service || ''],
    ['Valor', formatPrice(appointment.price)],
    ['Data', date],
    ['Horário', time],
    ['Objetivo', appointment.objective],
  ].filter(([, value]) => String(value || '').trim());

  const text = [`Novo agendamento no site.`, '', ...lines.map(([label, value]) => `${label}: ${value}`)].join('\n');
  const html = `
    <p>Novo agendamento no site.</p>
    <table cellpadding="6" cellspacing="0">
      ${lines
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
        )
        .join('')}
    </table>
  `;

  return {
    subject: `Novo agendamento: ${name} · ${date} às ${time}`,
    text,
    html,
  };
}

function formatDate(value) {
  const [year, month, day] = String(value).slice(0, 10).split('-');
  if (!year || !month || !day) return String(value || '');
  return `${day}/${month}/${year}`;
}

function formatPrice(value) {
  if (value == null || value === '') return '';
  const price = Number(value);
  if (!Number.isFinite(price)) return '';
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
