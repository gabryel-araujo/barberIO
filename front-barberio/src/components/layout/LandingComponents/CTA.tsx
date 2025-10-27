import { Button } from "@/components/ui/button";
import { whatsapp } from "@/lib/whstsapp";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Leve sua barbearia para o próximo nível com o BarberiO
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a dezenas de barbearias que já otimizaram sua gestão
          </p>
          <Button
            className="group"
            onClick={() => {
              router.push(`${whatsapp}83987482651`);
              //  href={`${whatsapp}${cliente.telefone}`}
            }}
          >
            Comece agora
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Sem cartão de crédito • Configuração em minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
