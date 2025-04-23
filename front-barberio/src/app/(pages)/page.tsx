import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

const home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-7 ">
      <p className="text-5xl font-bold">
        Bem-Vindo à <span className="text-[#3f88c5]">Navalha</span> Barber
      </p>
      <p className="text-slate-400 text-xl">
        Agende seu horário de forma rápida e fácil com os melhores barbeiros da
        cidade.
      </p>
      <div className="flex">
        <Button asChild className="rounded-sm bg-[#3f88c5] h-12 w-60">
          <Link href="/agendar">
            <Calendar /> <p className="font-bold text-lg">Agendar Horário</p>
          </Link>
        </Button>
      </div>
      <div className="bg-white border rounded-lg p-6">
        <p className="text-2xl text-center font-semibold">Nossos Serviços</p>
        <div className="grid grid-cols-2 text-center gap-5 pt-3">
          <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
            <p className="font-semibold">Corte de Cabelo</p>
            <span className="text-slate-400">
              Estilo personalizado para seu tipo de cabelo
            </span>
          </div>
          <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
            <p className="font-semibold">Barba</p>
            <span className="text-slate-400">
              Modelagem e tratamento completo
            </span>
          </div>
          <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
            <p className="font-semibold">Combo (Cabelo + Barba)</p>
            <span className="text-slate-400">
              Pacote completo com preço especial
            </span>
          </div>
          <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
            <p className="font-semibold">Tratamentos Especiais</p>
            <span className="text-slate-400">
              Hidratação, relaxamento e mais
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default home;
