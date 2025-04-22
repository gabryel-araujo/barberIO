import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

const home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 ">
      <p className="text-5xl font-bold">
        Bem-Vindo à <span className="text-[#3f88c5]">Navalha</span> Barber
      </p>
      <p className="text-slate-400 text-xl">
        Agende seu horário de forma rápida e fácil com os melhores barbeiros da
        cidade.
      </p>
      <div className="flex">
        <Button asChild className="rounded-sm bg-[#3f88c5] h-12 w-60">
          <Link href="/agendamentos">
            <Calendar /> <p className="font-bold text-md">Agendar Horário</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default home;
