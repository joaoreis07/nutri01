// Camada de dados do sistema de agendamento.
// Persistência via localStorage do navegador.

export interface Appointment {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  objective: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  createdAt: string;
}

export interface ScheduleConfig {
  /** Dias da semana em que há atendimento (0 = domingo ... 6 = sábado) */
  weekdays: number[];
  /** Horários de atendimento (HH:mm) */
  timeSlots: string[];
  /** Datas específicas bloqueadas (feriados, férias etc.) - YYYY-MM-DD */
  blockedDates: string[];
}

const CONFIG_KEY = 'nara_schedule_config';
const APPOINTMENTS_KEY = 'nara_appointments';
const SESSION_KEY = 'nara_admin_session';

// Credenciais do painel administrativo
const ADMIN_USER = 'nara';
const ADMIN_PASSWORD = 'nara2026';

const DEFAULT_CONFIG: ScheduleConfig = {
  weekdays: [1, 2, 3, 4, 5],
  timeSlots: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
  blockedDates: [],
};

// ---------- Utilitários de data ----------

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDateStr(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateBR(s: string): string {
  const d = parseDateStr(s);
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShortBR(s: string): string {
  const d = parseDateStr(s);
  return d.toLocaleDateString('pt-BR');
}

function todayStr(): string {
  return toDateStr(new Date());
}

// ---------- Persistência ----------

export function loadConfig(): ScheduleConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return { ...DEFAULT_CONFIG };
    const parsed = JSON.parse(raw);
    return {
      weekdays: Array.isArray(parsed.weekdays) ? parsed.weekdays : DEFAULT_CONFIG.weekdays,
      timeSlots: Array.isArray(parsed.timeSlots) ? parsed.timeSlots : DEFAULT_CONFIG.timeSlots,
      blockedDates: Array.isArray(parsed.blockedDates) ? parsed.blockedDates : [],
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(config: ScheduleConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

// ---------- Disponibilidade ----------

/** O dia está habilitado para atendimento (sem considerar horários já reservados)? */
export function isDayAvailable(dateStr: string, config?: ScheduleConfig): boolean {
  const cfg = config ?? loadConfig();
  if (dateStr < todayStr()) return false;
  if (cfg.blockedDates.includes(dateStr)) return false;
  const weekday = parseDateStr(dateStr).getDay();
  return cfg.weekdays.includes(weekday);
}

/** Horários livres de um dia (já removendo os reservados e, se for hoje, os que já passaram). */
export function getAvailableTimes(dateStr: string): string[] {
  const cfg = loadConfig();
  if (!isDayAvailable(dateStr, cfg)) return [];

  const appointments = loadAppointments();
  const taken = new Set(
    appointments.filter((a) => a.date === dateStr).map((a) => a.time)
  );

  let slots = cfg.timeSlots.filter((t) => !taken.has(t));

  if (dateStr === todayStr()) {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m > nowMinutes;
    });
  }

  return slots.sort();
}

/** O dia tem pelo menos um horário livre? */
export function dayHasFreeSlots(dateStr: string): boolean {
  return getAvailableTimes(dateStr).length > 0;
}

// ---------- Agendamentos ----------

export function bookAppointment(data: {
  name: string;
  whatsapp: string;
  email: string;
  objective: string;
  date: string;
  time: string;
}): { success: boolean; error?: string } {
  // Revalida disponibilidade no momento da confirmação
  const available = getAvailableTimes(data.date);
  if (!available.includes(data.time)) {
    return {
      success: false,
      error: 'Este horário acabou de ser reservado. Por favor, escolha outro horário.',
    };
  }

  const appointments = loadAppointments();
  appointments.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: data.name.trim(),
    whatsapp: data.whatsapp.trim(),
    email: data.email.trim(),
    objective: data.objective.trim(),
    date: data.date,
    time: data.time,
    createdAt: new Date().toISOString(),
  });
  saveAppointments(appointments);
  return { success: true };
}

export function cancelAppointment(id: string): void {
  const appointments = loadAppointments().filter((a) => a.id !== id);
  saveAppointments(appointments);
}

// ---------- Gerenciamento (admin) ----------

export function addTimeSlot(time: string): ScheduleConfig {
  const cfg = loadConfig();
  if (time && !cfg.timeSlots.includes(time)) {
    cfg.timeSlots = [...cfg.timeSlots, time].sort();
    saveConfig(cfg);
  }
  return cfg;
}

export function removeTimeSlot(time: string): ScheduleConfig {
  const cfg = loadConfig();
  cfg.timeSlots = cfg.timeSlots.filter((t) => t !== time);
  saveConfig(cfg);
  return cfg;
}

export function editTimeSlot(oldTime: string, newTime: string): ScheduleConfig {
  const cfg = loadConfig();
  cfg.timeSlots = cfg.timeSlots
    .map((t) => (t === oldTime ? newTime : t))
    .filter((t, i, arr) => arr.indexOf(t) === i)
    .sort();
  saveConfig(cfg);
  return cfg;
}

export function setWeekdays(weekdays: number[]): ScheduleConfig {
  const cfg = loadConfig();
  cfg.weekdays = weekdays;
  saveConfig(cfg);
  return cfg;
}

export function blockDate(dateStr: string): ScheduleConfig {
  const cfg = loadConfig();
  if (!cfg.blockedDates.includes(dateStr)) {
    cfg.blockedDates = [...cfg.blockedDates, dateStr].sort();
    saveConfig(cfg);
  }
  return cfg;
}

export function unblockDate(dateStr: string): ScheduleConfig {
  const cfg = loadConfig();
  cfg.blockedDates = cfg.blockedDates.filter((d) => d !== dateStr);
  saveConfig(cfg);
  return cfg;
}

/** Bloqueia um período inteiro (férias). */
export function blockDateRange(startStr: string, endStr: string): ScheduleConfig {
  const cfg = loadConfig();
  const start = parseDateStr(startStr);
  const end = parseDateStr(endStr);
  const blocked = new Set(cfg.blockedDates);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    blocked.add(toDateStr(d));
  }
  cfg.blockedDates = Array.from(blocked).sort();
  saveConfig(cfg);
  return cfg;
}

// ---------- Autenticação do painel ----------

export function login(user: string, password: string): boolean {
  const ok = user.trim().toLowerCase() === ADMIN_USER && password === ADMIN_PASSWORD;
  if (ok) sessionStorage.setItem(SESSION_KEY, 'ok');
  return ok;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'ok';
}
