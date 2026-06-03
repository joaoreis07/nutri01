import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Dumbbell,
  Apple,
  Activity,
  Users,
  Sparkles,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Check,
  Star,
  TrendingUp,
  Award,
  Clock,
  Target
} from 'lucide-react';
import { Button } from './components/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/Card';

export default function App() {
  const whatsappNumber = "5543999136245";
  const secondaryPhone = "(19) 9 9654-4605";
  const email = "lucianadominguesoliveira@gmail.com";
  const instagramUrl = "https://instagram.com/nutrilucianadomingues";
  const whatsappMessage = "Olá! Gostaria de agendar uma consulta nutricional.";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEÇÃO 1 - HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Nutrição especializada para emagrecimento, saúde e performance
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Acompanhamento nutricional com foco em obesidade, emagrecimento, nutrição esportiva e cuidado clínico para doenças crônicas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleWhatsApp} className="group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Consulta
                </Button>
                <Button size="lg" variant="secondary" onClick={handleWhatsApp}>
                  Falar no WhatsApp
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-primary">+300</div>
                  <div className="text-sm text-muted-foreground">Atendimento especializado</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">CRN</div>
                  <div className="text-sm text-muted-foreground">17564</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">UAN</div>
                  <div className="text-sm text-muted-foreground">Treinamentos e POPs</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=1000&fit=crop&auto=format"
                  alt="Alimentação saudável e colorida"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Saúde em primeiro lugar</div>
                    <div className="text-sm text-muted-foreground">Resultados sustentáveis</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 - SOBRE */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Prazer, sou Luciana Domingues</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1585358682246-23acb1561f6b?w=600&h=800&fit=crop&auto=format"
                    alt="Nutricionista profissional"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  Nutricionista especialista em obesidade, emagrecimento e nutrição esportiva, atuando também
                  nas áreas clínicas como diabetes e outras doenças crônicas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Especialidade</div>
                      <div className="text-muted-foreground">Obesidade, emagrecimento e nutrição esportiva</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Atuação clínica</div>
                      <div className="text-muted-foreground">Diabetes e outras doenças crônicas</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Registro Profissional</div>
                      <div className="text-muted-foreground">CRN 17564 - Ativo</div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
                  "Meu objetivo é ajudar você a alcançar mais saúde, performance e qualidade de vida com
                  orientação nutricional individualizada e sustentável."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 3 - ÁREAS DE ATENDIMENTO */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Áreas de Atendimento</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Acompanhamento nutricional especializado para diferentes objetivos e necessidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, title: "Emagrecimento", description: "Estratégias para perda de peso saudável e sustentável" },
              { icon: Dumbbell, title: "Nutrição esportiva", description: "Plano alimentar para performance, rotina de treinos e composição corporal" },
              { icon: Apple, title: "Obesidade", description: "Acompanhamento nutricional especializado e individualizado" },
              { icon: Activity, title: "Diabetes", description: "Orientação nutricional para controle glicêmico e qualidade de vida" },
              { icon: Heart, title: "Doenças crônicas", description: "Cuidado clínico para prevenção, tratamento e manutenção da saúde" },
              { icon: Sparkles, title: "Boas práticas em UAN", description: "Treinamentos, elaboração de POPs e Manual de Boas Práticas" },
            ].map((area, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <area.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{area.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 - COMO FUNCIONA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Como funciona o acompanhamento</h2>
            <p className="text-xl text-muted-foreground">Um processo completo para sua transformação</p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: Users, title: "Avaliação inicial", description: "Conhecimento completo do seu histórico e objetivos" },
              { step: "02", icon: Target, title: "Plano personalizado", description: "Elaboração do plano alimentar adequado para você" },
              { step: "03", icon: Clock, title: "Acompanhamento contínuo", description: "Suporte regular para garantir seus resultados" },
              { step: "04", icon: TrendingUp, title: "Ajustes e evolução", description: "Adaptações conforme sua progressão" },
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center space-y-4">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <item.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">PASSO {item.step}</div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/20" style={{ width: '100%', left: '60%' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 - RESULTADOS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Resultados dos pacientes</h2>
            <p className="text-xl text-muted-foreground">Transformações reais de quem confiou no processo</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Maria Silva",
                goal: "Emagrecimento",
                result: "-12kg em 4 meses",
                image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&h=600&fit=crop&auto=format"
              },
              {
                name: "João Santos",
                goal: "Ganho de massa",
                result: "+8kg de massa magra",
                image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=600&fit=crop&auto=format"
              },
              {
                name: "Ana Costa",
                goal: "Reeducação alimentar",
                result: "Hábitos transformados",
                image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=600&h=600&fit=crop&auto=format"
              },
            ].map((person, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={person.image}
                      alt={`Resultado de ${person.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{person.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      {person.goal}
                    </div>
                    <div className="text-2xl font-bold text-primary">{person.result}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 - DEPOIMENTOS */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">O que meus pacientes dizem</h2>
            <p className="text-xl text-muted-foreground">Avaliações reais de quem já transformou sua saúde</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Carla Mendes",
                text: "Profissional incrível! Me ajudou a emagrecer 15kg sem passar fome. O acompanhamento fez toda diferença!",
                rating: 5
              },
              {
                name: "Ricardo Alves",
                text: "Finalmente consegui ganhar massa muscular de forma saudável. Plano alimentar super personalizado!",
                rating: 5
              },
              {
                name: "Juliana Souza",
                text: "Mudou completamente minha relação com a comida. Hoje tenho uma alimentação equilibrada e prazerosa.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">Paciente</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 - DIFERENCIAIS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Por que escolher meu acompanhamento?</h2>
            <p className="text-xl text-muted-foreground">Diferenciais que fazem a diferença nos seus resultados</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: "Atendimento humanizado", description: "Acolhimento e empatia em todas as etapas do processo" },
              { icon: Target, title: "Plano 100% personalizado", description: "Estratégia única baseada nas suas necessidades e objetivos" },
              { icon: MessageCircle, title: "Suporte contínuo", description: "Acompanhamento próximo via WhatsApp durante todo o processo" },
              { icon: Sparkles, title: "Estratégias práticas", description: "Orientações aplicáveis à sua rotina real" },
              { icon: Activity, title: "Consultas flexíveis", description: "Atendimento online e presencial conforme sua preferência" },
              { icon: Award, title: "Atuação completa", description: "Consultório, nutrição clínica, esportiva e treinamentos para UAN" },
            ].map((differential, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <differential.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{differential.title}</h3>
                  <p className="text-muted-foreground">{differential.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 - CHAMADA FINAL */}
      <section className="py-32 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            {...fadeInUp}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Comece sua transformação hoje
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Agende sua consulta e dê o primeiro passo para uma vida mais saudável.
              Vamos juntos nessa jornada de transformação!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg h-16 px-10 animate-pulse"
              >
                <MessageCircle className="w-6 h-6" />
                Agendar pelo WhatsApp
              </Button>
            </div>
            <div className="pt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Resposta rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Sem compromisso</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Luciana Domingues de Oliveira</h3>
              <p className="text-muted-foreground">
                Nutricionista especialista em obesidade, emagrecimento, nutrição esportiva e cuidado clínico.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contato</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>(43) 9 9913-6245</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{secondaryPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Localização</h4>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Atendimento nutricional clínico e esportivo<br />Treinamentos para Unidades de Alimentação e Nutrição</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Redes Sociais</h4>
              <div className="flex gap-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${email}`}
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 Luciana Domingues de Oliveira. Todos os direitos reservados. CRN 17564</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
