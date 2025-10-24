import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono da Barbearia Estilo Urbano",
    content:
      "O BarberiO transformou completamente a gestão da minha barbearia. Os agendamentos ficaram muito mais organizados e reduzimos as faltas em 70%.",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    role: "Proprietário da Classic Barber",
    content:
      "Sistema intuitivo e completo. A equipe aprendeu a usar em minutos e hoje não conseguimos mais trabalhar sem ele. Recomendo muito!",
    rating: 5,
  },
  {
    name: "Fernando Costa",
    role: "Gestor da Premium Cuts",
    content:
      "O painel administrativo me dá uma visão clara do negócio. Consigo acompanhar vendas, comissões e performance em tempo real. Essencial!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Centenas de barbearias já confiam no BarberiO
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 animate-slide-up hover:shadow-xl transition-all duration-300 bg-card border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
