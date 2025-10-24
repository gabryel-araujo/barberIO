"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Users, Scissors, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Agendamento Automatizado",
    description:
      "Sistema inteligente de agendamento online que reduz faltas e otimiza seu tempo.",
  },
  {
    icon: Users,
    title: "Controle de Clientes",
    description:
      "Gerencie informações, histórico e preferências de todos os seus clientes em um só lugar.",
  },
  {
    icon: Scissors,
    title: "Gestão de Barbeiros",
    description:
      "Controle serviços, comissões e desempenho de cada profissional da sua equipe.",
  },
  {
    icon: BarChart3,
    title: "Painel Administrativo",
    description:
      "Acompanhe métricas, faturamento e insights do seu negócio em tempo real.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Recursos que fazem a diferença
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para levar sua barbearia ao próximo nível
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 animate-slide-up bg-card border-border hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
