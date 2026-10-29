/** Número geral da Nara (43) 98830-0445 */
export const NARA_WHATSAPP_E164 = '5543988300445';

/** Contato Ourinhos - SP (formulário e modal presencial) */
export const OURINHOS_WHATSAPP_E164 = '5514997154514';

/** Clínica Santa Cruz do Rio Pardo - SP (somente formulário e modal presencial) */
export const SANTA_CRUZ_CLINIC_WHATSAPP_E164 = '5514996080605';

export const PROFESSIONAL_REGISTRATION =
  'CRN-8 19896/P · CRN-3 00933/S · CREF 038535-G/PR';

/** Mensagem padrão para agendamento nas clínicas (formulário do site e modal). */
export function buildClinicBookingMessage(cityTag: string): string {
  return `Oi! Quero agendar uma consulta com a Dra. Nara Rossetto em ${cityTag}.`;
}

export const WHATSAPP_MODAL = {
  online: {
    message:
      'Oi, Nara! Tudo bem? 😊 Gostaria de agendar uma consulta nutricional online. Você poderia me informar os horários disponíveis e como funciona o atendimento?',
  },
  presencial: {
    'ribeirao-claro': {
      label: 'Ribeirão Claro',
      phone: NARA_WHATSAPP_E164,
      message:
        'Oi, Nara! Tudo bem? 😊 Gostaria de agendar uma consulta nutricional presencial com você em Ribeirão Claro. Você poderia me informar os horários disponíveis?',
    },
    ourinhos: {
      label: 'Ourinhos - SP',
      phone: OURINHOS_WHATSAPP_E164,
      message: buildClinicBookingMessage('Ourinhos-SP'),
    },
    'santa-cruz': {
      label: 'Santa Cruz do Rio Pardo - SP',
      phone: SANTA_CRUZ_CLINIC_WHATSAPP_E164,
      message: buildClinicBookingMessage('Santa Cruz do Rio Pardo-SP'),
    },
  },
} as const;

export type PresencialCity = keyof typeof WHATSAPP_MODAL.presencial;

export const FORM_WHATSAPP = {
  ourinhos: {
    phone: OURINHOS_WHATSAPP_E164,
    message: buildClinicBookingMessage('Ourinhos-SP'),
  },
  'santa-cruz': {
    phone: SANTA_CRUZ_CLINIC_WHATSAPP_E164,
    message: buildClinicBookingMessage('Santa Cruz do Rio Pardo-SP'),
  },
} as const;

export function openWhatsApp(phoneE164: string, message: string): void {
  window.open(
    `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  );
}
