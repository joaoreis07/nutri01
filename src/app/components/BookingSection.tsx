import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { Calendar } from './Calendar';
import {
  bookAppointment,
  dayHasFreeSlots,
  formatDateBR,
  getAvailableTimes,
} from '../lib/scheduling';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const inputClass =
  'w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors';

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', objective: '' });
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTimes = useCallback((date: string | null) => {
    setAvailableTimes(date ? getAvailableTimes(date) : []);
  }, []);

  // Atualiza disponibilidade se os dados mudarem em outra aba (ex.: painel admin aberto)
  useEffect(() => {
    const onStorage = () => {
      setRefreshKey((k) => k + 1);
      refreshTimes(selectedDate);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [selectedDate, refreshTimes]);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setError(null);
    refreshTimes(date);
  };

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const formValid =
    form.name.trim().length >= 3 &&
    form.whatsapp.replace(/\D/g, '').length >= 10 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.objective.trim().length > 0;

  const canConfirm = formValid && selectedDate !== null && selectedTime !== null;

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setError(null);
    const result = bookAppointment({
      ...form,
      date: selectedDate,
      time: selectedTime,
    });
    if (result.success) {
      setConfirmed({ date: selectedDate, time: selectedTime });
    } else {
      setError(result.error ?? 'Não foi possível agendar. Tente novamente.');
      setSelectedTime(null);
      refreshTimes(selectedDate);
    }
  };

  const resetBooking = () => {
    setConfirmed(null);
    setForm({ name: '', whatsapp: '', email: '', objective: '' });
    setSelectedDate(null);
    setSelectedTime(null);
    setError(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <section id="agendar" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Agendar Consulta</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o melhor dia e horário para você. Rápido, fácil e sem compromisso.
          </p>
        </motion.div>

        <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
          <Card className="hover:translate-y-0">
            <CardContent className="p-6 md:p-10">
              {confirmed ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">
                    Consulta agendada com sucesso!
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    <span className="font-semibold text-foreground capitalize">
                      {formatDateBR(confirmed.date)}
                    </span>
                    {' '}às{' '}
                    <span className="font-semibold text-foreground">{confirmed.time}</span>
                  </p>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Seu horário foi reservado. Qualquer dúvida, entre em contato pelo WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <Button variant="secondary" onClick={resetBooking}>
                      <CalendarDays className="w-5 h-5" />
                      Fazer novo agendamento
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Coluna 1: dados do paciente */}
                  <div className="space-y-5">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Seus dados
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          placeholder="Seu nome completo"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={form.whatsapp}
                          onChange={(e) => updateForm('whatsapp', e.target.value)}
                          placeholder="(43) 99999-9999"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Objetivo da consulta
                        </label>
                        <textarea
                          value={form.objective}
                          onChange={(e) => updateForm('objective', e.target.value)}
                          placeholder="Ex.: emagrecimento, ganho de massa, reeducação alimentar..."
                          rows={3}
                          className={`${inputClass} h-auto py-3 resize-none`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2: calendário e horários */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" />
                      Escolha a data e o horário
                    </h3>

                    <Calendar
                      key={refreshKey}
                      isDayEnabled={dayHasFreeSlots}
                      selectedDate={selectedDate}
                      onSelectDate={handleSelectDate}
                    />

                    {selectedDate && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          Horários disponíveis para{' '}
                          <span className="capitalize">{formatDateBR(selectedDate)}</span>
                        </div>
                        {availableTimes.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`h-11 rounded-lg border text-sm font-medium transition-colors ${
                                  selectedTime === time
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border text-foreground hover:border-primary hover:text-primary'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Não há horários disponíveis neste dia.
                          </p>
                        )}
                      </div>
                    )}

                    {error && (
                      <p className="text-sm text-destructive font-medium">{error}</p>
                    )}

                    <Button
                      size="lg"
                      className="w-full"
                      disabled={!canConfirm}
                      onClick={handleConfirm}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Confirmar Agendamento
                    </Button>
                    {!canConfirm && (
                      <p className="text-xs text-muted-foreground text-center">
                        Preencha seus dados e selecione data e horário para confirmar.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
