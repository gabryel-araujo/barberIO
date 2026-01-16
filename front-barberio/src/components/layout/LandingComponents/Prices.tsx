import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { whatsapp } from "@/lib/whstsapp";

const plans = [
  {
    name: "Essencial",
    price: "R$ 30",
    period: "mês",
    description:
      "Ideal para barbearias individuais que estão começando a otimizar os atendimentos.",
    popular: false,
    features: [
      "1 unidade cadastrada",
      "1 barbeiro ativo",
      "Agendamento online",
      "Gestão básica de clientes",
      "Envio de lembretes automáticos",
      "Suporte via chat",
    ],
    buttonText: "Assinar Essencial",
    buttonVariant: "outline" as const,
    note: "Cancele quando quiser",
  },
  {
    name: "Profissional",
    price: "R$ 55",
    period: "mês",
    description:
      "Perfeito para barbearias de médio porte que querem otimizar a gestão e o fluxo de clientes.",
    popular: true,
    features: [
      "Até 2 unidades cadastradas",
      "Até 3 barbeiros ativos",
      "Agendamento online",
      "Gestão de clientes",
      "Envio de lembretes automáticos",
      "Suporte prioritário",
      // "Controle de comissões",
      // "Gestão financeira integrada",
      // "Relatórios avançados",
    ],
    buttonText: "Assinar Profissional",
    buttonVariant: "default" as const,
    note: "Plano mais escolhido",
  },
  {
    name: "Premium",
    price: "R$ 99",
    period: "mês",
    description:
      "Solução completa para redes de barbearias que precisam de performance e personalização.",
    popular: false,
    features: [
      "Até 4 unidades cadastradas",
      "Até 10 barbeiros ativos",
      "Agendamento online",
      "Gestão de clientes",
      "Envio de lembretes automáticos",
      "Suporte prioritário",
      // "Gerenciamento corporativo",
      // "Painel de desempenho completo",
      // "Integração com WhatsApp API",
      // "Controle de produtividade",
      // "Suporte 24h com SLA garantido",
    ],
    buttonText: "Falar com vendas",
    buttonVariant: "outline" as const,
    note: "Plano personalizado para grandes negócios",
  },
];

const Prices = () => {
  const router = useRouter();

  return (
    <section
      id="precos"
      className="py-20 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Planos Flexíveis
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Planos que{" "}
            <span className="bg-gradient-to-r font-black from-primary to-blue-400 bg-clip-text text-transparent">
              Crescem{" "}
            </span>
            com Você
          </h2>
          <p className="text-lg font-semibold text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades e escale conforme seu
            sucesso. Sem surpresas, sem taxas ocultas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-blue-400 text-primary-foreground px-4 py-2 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`p-8 h-full flex flex-col transition-all duration-300 border-border bg-card group hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)] ${
                  plan.popular ? "border-primary/30 shadow-lg relative" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    className="w-full mb-3"
                    variant={plan.buttonVariant}
                    size="lg"
                    onClick={() => {
                      router.push(`${whatsapp}83987482651`);
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {plan.note}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prices;
