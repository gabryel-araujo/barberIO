const features = [
  {
    image: "/iPhone.png",
    title: "Agendamento Inteligente",
    description:
      "Sistema completo de agendamento com notificações automáticas, lembretes por SMS/WhatsApp e integração com calendário.",
    class: "relative rounded-4xl shadow-2xl w-64",
  },
  {
    image: "/Macbook.png",
    title: "Gestão Completa de Clientes",
    description:
      "Cadastro detalhado, histórico de serviços, preferências e ferramentas de fidelização para aumentar o retorno dos clientes.",
    class: "relative w-128",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Veja o BarberiO em ação
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div
                className={`animate-scale-in ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="relative group flex justify-center">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl group-hover:bg-primary/30 transition-all "></div>
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
