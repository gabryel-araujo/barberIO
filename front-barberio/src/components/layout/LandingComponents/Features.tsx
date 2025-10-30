const features = [
  {
    image: "/imagens/celularAgendamento.svg",
    title: "Agendamento Inteligente",
    description:
      "Com o módulo de agendamento do BarberIO, seus clientes contam com uma experiência ágil, dinâmica e totalmente segura. O processo de marcação é rápido e intuitivo, com conferência automática e lembrete de confirmação por e-mail garantindo comodidade, confiança e eficiência em cada atendimento.",
    class: "relative rounded-4xl w-64",
  },
  {
    image: "/imagens/pcBarbeiros.svg",
    title: "Gestão Completa de Clientes",
    description:
      "O BarberIO é uma plataforma completa de gestão inteligente para barbearias, desenvolvida para oferecer controle total e eficiência em cada detalhe da operação. Com o BarberIO, você gerencia agendamentos, confirmações e clientes em tempo real, além de ter controle total sobre barbeiros, horários de funcionamento, serviços e sequência de atendimentos. Tudo isso em um ambiente seguro, ágil e intuitivo, criado para otimizar processos, reduzir falhas e elevar a experiência do cliente seja no atendimento presencial ou no agendamento online.",
    class: "relative w-128 rounded-xl",
  },
];

const Features = () => {
  return (
    <section className="py-24 md:px-32 bg-background" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Veja o{" "}
            <span className="bg-gradient-to-r font-black from-primary to-blue-400 bg-clip-text text-transparent">
              BarberiO{" "}
            </span>
            em ação
          </h2>
          <p className="text-xl text-muted-foreground font-semibold max-w-2xl mx-auto">
            Interface intuitiva e poderosa para gerenciar todos os aspectos da
            sua barbearia
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`animate-slide-up ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg pl-4 font-semibold text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div
                className={`animate-scale-in ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="relative group flex justify-center">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all "></div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={feature.class}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
