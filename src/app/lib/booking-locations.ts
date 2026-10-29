import {
  buildClinicBookingMessage,
  OURINHOS_WHATSAPP_E164,
  SANTA_CRUZ_CLINIC_WHATSAPP_E164,
} from './contact';

export type BookingLocationId = 'online' | 'ribeirao-claro' | 'ourinhos' | 'santa-cruz';

export type SiteBookingLocationId = 'online' | 'ribeirao-claro';

export type WhatsAppBookingLocationId = 'ourinhos' | 'santa-cruz';

type SiteBookingOption = {
  id: SiteBookingLocationId;
  channel: 'site';
  title: string;
  subtitle: string;
  objectivePrefix: string;
};

type WhatsAppBookingOption = {
  id: WhatsAppBookingLocationId;
  channel: 'whatsapp';
  title: string;
  subtitle: string;
  guidance: string;
  phoneE164: string;
  whatsappMessage: string;
};

export type BookingLocationOption = SiteBookingOption | WhatsAppBookingOption;

export const BOOKING_LOCATION_OPTIONS: BookingLocationOption[] = [
  {
    id: 'online',
    channel: 'site',
    title: 'On-line',
    subtitle: 'Escolha seu melhor horário pelo site.',
    objectivePrefix: '[Online] ',
  },
  {
    id: 'ribeirao-claro',
    channel: 'site',
    title: 'Ribeirão Claro',
    subtitle: 'Consulte os horários e agende pelo site.',
    objectivePrefix: '[Ribeirão Claro] ',
  },
  {
    id: 'ourinhos',
    channel: 'whatsapp',
    title: 'Ourinhos — SP',
    subtitle: 'Agendamento diretamente com a clínica pelo WhatsApp.',
    guidance:
      'Em Ourinhos, os agendamentos são feitos diretamente com a clínica pelo WhatsApp.',
    phoneE164: OURINHOS_WHATSAPP_E164,
    whatsappMessage: buildClinicBookingMessage('Ourinhos-SP'),
  },
  {
    id: 'santa-cruz',
    channel: 'whatsapp',
    title: 'Santa Cruz do Rio Pardo — SP',
    subtitle: 'Agendamento diretamente com a clínica pelo WhatsApp.',
    guidance:
      'Em Santa Cruz do Rio Pardo, os agendamentos são feitos diretamente com a clínica pelo WhatsApp.',
    phoneE164: SANTA_CRUZ_CLINIC_WHATSAPP_E164,
    whatsappMessage: buildClinicBookingMessage('Santa Cruz do Rio Pardo-SP'),
  },
];

export function getBookingLocationOption(
  id: BookingLocationId,
): BookingLocationOption | undefined {
  return BOOKING_LOCATION_OPTIONS.find((option) => option.id === id);
}

export function isSiteBookingLocation(
  id: BookingLocationId | null | undefined,
): id is SiteBookingLocationId {
  return id === 'online' || id === 'ribeirao-claro';
}

export function isWhatsAppBookingLocation(
  id: BookingLocationId | null | undefined,
): id is WhatsAppBookingLocationId {
  return id === 'ourinhos' || id === 'santa-cruz';
}

export const SITE_BOOKING_REJECTED_ERROR =
  'Esta localidade exige agendamento pelo WhatsApp da clínica.';
