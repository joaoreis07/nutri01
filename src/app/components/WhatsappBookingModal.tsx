import { useEffect, useState } from 'react';

import { CalendarDays, Leaf, MapPin, MessageCircle, Video } from 'lucide-react';

import { Button } from './Button';

import {

  Dialog,

  DialogContent,

  DialogDescription,

  DialogHeader,

  DialogTitle,

} from './ui/dialog';

import {

  NARA_WHATSAPP_E164,

  openWhatsApp,

  PresencialCity,

  WHATSAPP_MODAL,

} from '../lib/contact';



const PRESENCIAL_CITIES: PresencialCity[] = ['ribeirao-claro', 'ourinhos', 'santa-cruz'];



type Props = {

  open: boolean;

  onOpenChange: (open: boolean) => void;

};



export function WhatsappBookingModal({ open, onOpenChange }: Props) {

  const [presencialCity, setPresencialCity] = useState<PresencialCity | null>(null);



  useEffect(() => {

    if (!open) setPresencialCity(null);

  }, [open]);



  const handleOnline = () => {

    openWhatsApp(NARA_WHATSAPP_E164, WHATSAPP_MODAL.online.message);

    onOpenChange(false);

  };



  const handlePresencial = () => {

    if (!presencialCity) return;

    const city = WHATSAPP_MODAL.presencial[presencialCity];

    openWhatsApp(city.phone, city.message);

    onOpenChange(false);

  };



  return (

    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="w-[min(100%-1.5rem,32rem)] sm:max-w-lg max-h-none overflow-x-hidden overflow-y-visible p-0 gap-0 rounded-lg border-border shadow-xl max-sm:max-h-[min(90vh,720px)] max-sm:overflow-y-auto">

        <div className="p-4 sm:p-5 space-y-4 min-w-0">

          <DialogHeader className="space-y-2 text-center sm:text-center">

            <div className="mx-auto w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">

              <CalendarDays className="w-5 h-5 text-primary" aria-hidden />

            </div>

            <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground leading-tight">

              Vamos agendar sua consulta?

            </DialogTitle>

            <DialogDescription className="text-sm sm:text-base text-muted-foreground">

              Escolha a modalidade ideal para você.

            </DialogDescription>

          </DialogHeader>



          <div className="flex flex-col gap-3 sm:gap-4">

            <div className="rounded-lg border border-border bg-card p-4 sm:p-5 space-y-4 min-w-0">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">

                  <Video className="w-5 h-5 text-primary" aria-hidden />

                </div>

                <div className="space-y-1 min-w-0">

                  <h3 className="font-semibold text-foreground">Consulta online</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">

                    Atendimento nutricional de onde estiver, com praticidade e acompanhamento

                    personalizado.

                  </p>

                </div>

              </div>

              <Button

                size="lg"

                className="w-full max-w-full h-auto min-h-12 whitespace-normal py-3 px-4 text-sm sm:text-base leading-snug"

                onClick={handleOnline}

              >

                <MessageCircle className="w-5 h-5 shrink-0" />

                Agendar consulta online via WhatsApp

              </Button>

            </div>



            <div className="rounded-lg border border-border bg-card p-4 sm:p-5 space-y-4 min-w-0">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">

                  <MapPin className="w-5 h-5 text-primary" aria-hidden />

                </div>

                <div className="space-y-1 min-w-0">

                  <h3 className="font-semibold text-foreground">Consulta presencial</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">

                    Atendimento presencial em Ribeirão Claro, Ourinhos e Santa Cruz do Rio Pardo.

                    Consulte os locais e horários disponíveis.

                  </p>

                </div>

              </div>



              <fieldset className="space-y-2 min-w-0">

                <legend className="text-sm font-medium text-foreground mb-1">

                  Selecione a cidade

                </legend>

                {PRESENCIAL_CITIES.map((cityId) => {

                  const city = WHATSAPP_MODAL.presencial[cityId];

                  return (

                    <label

                      key={cityId}

                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${

                        presencialCity === cityId

                          ? 'border-primary bg-primary/10'

                          : 'border-border hover:border-primary/50'

                      }`}

                    >

                      <input

                        type="radio"

                        name="presencial-city"

                        className="accent-primary shrink-0"

                        checked={presencialCity === cityId}

                        onChange={() => setPresencialCity(cityId)}

                      />

                      <span className="text-sm font-medium text-foreground min-w-0 flex-1 leading-snug">

                        {city.label}

                      </span>

                    </label>

                  );

                })}

              </fieldset>



              <Button

                size="lg"

                variant="secondary"

                className="w-full max-w-full h-auto min-h-12 whitespace-normal py-3 px-4 text-sm sm:text-base leading-snug border-2 border-primary text-primary hover:bg-primary/5"

                disabled={!presencialCity}

                onClick={handlePresencial}

              >

                <MessageCircle className="w-5 h-5 shrink-0" />

                Agendar consulta presencial via WhatsApp

              </Button>

            </div>

          </div>



          <div className="flex items-center justify-center gap-2 pt-2 border-t border-border text-xs sm:text-sm text-muted-foreground text-center">

            <Leaf className="w-4 h-4 text-primary shrink-0" aria-hidden />

            <span className="min-w-0">Atendimento humanizado, pensado para você.</span>

          </div>

        </div>

      </DialogContent>

    </Dialog>

  );

}


