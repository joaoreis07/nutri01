import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  CalendarDays,
  CalendarOff,
  CheckCircle2,
  Clock,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Pencil,
  Plus,
  Target,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Calendar } from '../components/Calendar';
import {
  Appointment,
  ScheduleConfig,
  addTimeSlot,
  blockDate,
  blockDateRange,
  cancelAppointment,
  editTimeSlot,
  formatDateShortBR,
  isLoggedIn,
  loadAppointments,
  loadConfig,
  login,
  logout,
  parseDateStr,
  removeTimeSlot,
  setWeekdays,
  toDateStr,
  unblockDate,
} from '../lib/scheduling';

const WEEKDAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const inputClass =
  'h-11 px-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors';

type Tab = 'agendamentos' | 'horarios' | 'dias';

export default function AdminPanel() {
  const [logged, setLogged] = useState(isLoggedIn());

  return logged ? (
    <Dashboard onLogout={() => { logout(); setLogged(false); }} />
  ) : (
    <LoginScreen onLogin={() => setLogged(true)} />
  );
}

// ---------- Tela de login ----------

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(user, password)) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="hover:translate-y-0">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Área Administrativa</h1>
              <p className="text-muted-foreground">
                Acesso restrito à nutricionista
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Login</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => { setUser(e.target.value); setError(false); }}
                  placeholder="Seu login"
                  className={`${inputClass} w-full`}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Sua senha"
                  className={`${inputClass} w-full`}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive font-medium">
                  Login ou senha incorretos.
                </p>
              )}
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              <a href="#/" className="hover:text-primary transition-colors">← Voltar para o site</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ---------- Painel ----------

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('agendamentos');
  const [config, setConfig] = useState<ScheduleConfig>(loadConfig());
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments());

  const refresh = () => {
    setConfig(loadConfig());
    setAppointments(loadAppointments());
  };

  const tabs: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
    { id: 'agendamentos', label: 'Agendamentos', icon: CalendarDays },
    { id: 'horarios', label: 'Horários', icon: Clock },
    { id: 'dias', label: 'Dias', icon: CalendarOff },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold text-foreground leading-tight">Nara Rossetto</div>
              <div className="text-xs text-muted-foreground leading-tight">Painel de Agendamentos</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 h-11 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'agendamentos' && (
          <AppointmentsTab appointments={appointments} onChange={refresh} />
        )}
        {tab === 'horarios' && <SlotsTab config={config} onChange={refresh} />}
        {tab === 'dias' && <DaysTab config={config} onChange={refresh} />}
      </div>
    </div>
  );
}

// ---------- Aba: Agendamentos ----------

function AppointmentsTab({
  appointments,
  onChange,
}: {
  appointments: Appointment[];
  onChange: () => void;
}) {
  const today = toDateStr(new Date());

  const sorted = useMemo(
    () =>
      [...appointments].sort((a, b) =>
        a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
      ),
    [appointments]
  );
  const upcoming = sorted.filter((a) => a.date >= today);
  const past = sorted.filter((a) => a.date < today);

  const handleCancel = (a: Appointment) => {
    const ok = window.confirm(
      `Cancelar a consulta de ${a.name} em ${formatDateShortBR(a.date)} às ${a.time}?\nO horário voltará a ficar disponível.`
    );
    if (ok) {
      cancelAppointment(a.id);
      onChange();
    }
  };

  if (appointments.length === 0) {
    return (
      <Card className="hover:translate-y-0">
        <CardContent className="p-12 text-center space-y-3">
          <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto" />
          <p className="text-muted-foreground">Nenhum agendamento ainda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Próximas consultas ({upcoming.length})
        </h2>
        {upcoming.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma consulta futura agendada.</p>
        )}
        {upcoming.map((a) => (
          <AppointmentCard key={a.id} appointment={a} onCancel={() => handleCancel(a)} />
        ))}
      </div>

      {past.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Consultas passadas ({past.length})
          </h2>
          {past.map((a) => (
            <AppointmentCard key={a.id} appointment={a} onCancel={() => handleCancel(a)} past />
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({
  appointment: a,
  onCancel,
  past = false,
}: {
  appointment: Appointment;
  onCancel: () => void;
  past?: boolean;
}) {
  return (
    <Card className={`hover:translate-y-0 ${past ? 'opacity-60' : ''}`}>
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{formatDateShortBR(a.date)}</div>
              <div className="text-sm text-primary font-medium">{a.time}</div>
            </div>
          </div>

          <div className="flex-1 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <User className="w-4 h-4 text-primary flex-shrink-0" />
              {a.name}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
              {a.whatsapp}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              {a.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="line-clamp-2">{a.objective}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive self-end sm:self-center flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Aba: Horários ----------

function SlotsTab({ config, onChange }: { config: ScheduleConfig; onChange: () => void }) {
  const [newTime, setNewTime] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!newTime) return;
    addTimeSlot(newTime);
    setNewTime('');
    onChange();
  };

  const handleEdit = (time: string) => {
    setEditing(time);
    setEditValue(time);
  };

  const handleSaveEdit = () => {
    if (editing && editValue) {
      editTimeSlot(editing, editValue);
      setEditing(null);
      onChange();
    }
  };

  return (
    <Card className="hover:translate-y-0">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Horários de atendimento
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estes horários valem para todos os dias liberados. Horários já reservados não aparecem
          para os pacientes.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {config.timeSlots.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum horário cadastrado.</p>
          )}
          {config.timeSlots.map((time) =>
            editing === time ? (
              <div key={time} className="flex items-center gap-1">
                <input
                  type="time"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={inputClass}
                />
                <Button size="sm" onClick={handleSaveEdit}>Salvar</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                key={time}
                className="flex items-center gap-1 bg-primary/10 text-foreground rounded-lg pl-4 pr-1 h-11 font-medium"
              >
                {time}
                <button
                  onClick={() => handleEdit(time)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Editar ${time}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { removeTimeSlot(time); onChange(); }}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Remover ${time}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className={inputClass}
          />
          <Button onClick={handleAdd} disabled={!newTime}>
            <Plus className="w-4 h-4" />
            Adicionar horário
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Aba: Dias ----------

function DaysTab({ config, onChange }: { config: ScheduleConfig; onChange: () => void }) {
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const today = toDateStr(new Date());

  const toggleWeekday = (day: number) => {
    const next = config.weekdays.includes(day)
      ? config.weekdays.filter((d) => d !== day)
      : [...config.weekdays, day].sort();
    setWeekdays(next);
    onChange();
  };

  const handleToggleDate = (dateStr: string) => {
    if (config.blockedDates.includes(dateStr)) {
      unblockDate(dateStr);
    } else {
      blockDate(dateStr);
    }
    onChange();
  };

  const handleBlockRange = () => {
    if (!rangeStart || !rangeEnd || rangeStart > rangeEnd) return;
    blockDateRange(rangeStart, rangeEnd);
    setRangeStart('');
    setRangeEnd('');
    onChange();
  };

  const futureBlocked = config.blockedDates.filter((d) => d >= today);

  return (
    <div className="space-y-6">
      <Card className="hover:translate-y-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Dias da semana com atendimento
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Marque os dias da semana em que você atende.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {WEEKDAY_NAMES.map((name, day) => {
              const active = config.weekdays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleWeekday(day)}
                  className={`h-11 px-4 rounded-lg text-sm font-medium border transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarOff className="w-5 h-5 text-primary" />
            Bloquear dias específicos
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Clique em um dia no calendário para bloquear ou desbloquear (feriados, compromissos
            etc.). Dias bloqueados aparecem riscados.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="max-w-sm">
            <Calendar
              isDayEnabled={(d) => d >= today}
              dayClassName={(d) =>
                config.blockedDates.includes(d)
                  ? 'bg-destructive/15 text-destructive line-through hover:bg-destructive/25'
                  : ''
              }
              selectedDate={null}
              onSelectDate={handleToggleDate}
            />
          </div>

          <div className="pt-6 border-t border-border space-y-3">
            <div className="font-medium text-foreground">Bloquear período (férias)</div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                min={today}
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className={inputClass}
              />
              <span className="text-muted-foreground">até</span>
              <input
                type="date"
                min={rangeStart || today}
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className={inputClass}
              />
              <Button
                onClick={handleBlockRange}
                disabled={!rangeStart || !rangeEnd || rangeStart > rangeEnd}
              >
                <CalendarOff className="w-4 h-4" />
                Bloquear período
              </Button>
            </div>
          </div>

          {futureBlocked.length > 0 && (
            <div className="pt-6 border-t border-border space-y-3">
              <div className="font-medium text-foreground">
                Dias bloqueados ({futureBlocked.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {futureBlocked.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-1 bg-destructive/10 text-destructive rounded-lg pl-3 pr-1 h-9 text-sm font-medium"
                  >
                    {formatDateShortBR(d)}
                    <span className="text-xs font-normal opacity-70 ml-1">
                      ({WEEKDAY_NAMES[parseDateStr(d).getDay()].slice(0, 3)})
                    </span>
                    <button
                      onClick={() => { unblockDate(d); onChange(); }}
                      className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      aria-label={`Desbloquear ${d}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
