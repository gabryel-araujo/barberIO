import { CardPequeno } from "@/components/layout/Dashboard/cardPequeno";
import { TitulosPages } from "@/components/layout/titulosPages";
import { Calendar, Scissors, Users2 } from "lucide-react";

const dashboard = () => {
  return (
    <div className="w-screen h-screen flex bg-[#e6f0ff]">
      <div className="w-full flex flex-col px-10 py-5">
        <TitulosPages
          Titulos="Dashboard"
          subtitulo="Bem-vindo ao seu sistema de agendamentos."
        />
        {/* inicio de cards dashboard */}
        <div className="pt-10 flex gap-5">
          <CardPequeno
            Titulo="Agendamentos Hoje"
            Quantidade={20}
            Legenda="17 de Junho"
            Icon={<Calendar />}
          />
          <CardPequeno
            Titulo="Serviços"
            Quantidade={20}
            Legenda="serviços disponíveis"
            Icon={<Scissors />}
          />
          <CardPequeno
            Titulo="Barbeiros"
            Quantidade={20}
            Legenda="profissionais disponíveis"
            Icon={<Users2 />}
          />
        </div>
      </div>
    </div>
  );
};
export default dashboard;
