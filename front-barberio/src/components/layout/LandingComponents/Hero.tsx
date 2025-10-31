"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative md:px-32 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background"
      id="home"
    >
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div> */}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-black lg:text-7xl text-[#1A1F2C]  mb-6 leading-tight">
              Simplifique a gestão da sua{" "}
              <span className="text-primary">barbearia</span> com o BarberiO
            </h1>
            <p className="text-xl md:text-xl font-semibold text-muted-foreground mb-8 leading-relaxed">
              Agende, controle e otimize seu negócio em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="group">
                Comece Agora
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="group">
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </Button>
            </div>
          </div>

          <div className="animate-scale-in relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <img
              src="/imagens/heroDispositivo.svg"
              alt="Dashboard BarberiO"
              className="relative rounded-2xl  w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
