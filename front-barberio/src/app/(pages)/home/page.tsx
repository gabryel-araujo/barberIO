"use client";

import Cookies from "js-cookie";
import { PrefetchAgendar } from "../../../../components/PrefetchAgendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BotaoMeusAgendamentos } from "../../../../components/BotaoMeusAgendamentos";
import { MensagemPadrao } from "../../../../components/MensagemPadrao";
import { AgendamentoClientes } from "../../../../components/AgendamentoClientes";

const Home = () => {
  const gestorLogado = Cookies.get("authToken");
  const empresaId = window.location.href.split("=")[1];
  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center space-y-7 px-7 pt-7 md:pt-0 bg-[#e6f0ff]">
      <PrefetchAgendar />
      <p className="text-5xl font-bold text-center ">
        Bem-Vindo à <span className="text-primary">Barber</span>iO
      </p>
      <p className="text-slate-500 text-xl text-center">
        Agende seu horário de forma rápida e fácil com os melhores barbeiros da
        cidade.
      </p>
      <div className="flex flex-col md:flex-row gap-5 ">
        <div className="flex">
          <Button asChild className="rounded-sm bg-primary h-12 w-60">
            <Link href={`/agendar?ref=${empresaId}`}>
              <Calendar /> <p className="font-bold text-lg">Agendar Horário</p>
            </Link>
          </Button>
        </div>
        <div className="flex">{!gestorLogado && <BotaoMeusAgendamentos />}</div>
      </div>
      <MensagemPadrao />
      <AgendamentoClientes />
      {/* <ImagemBarbearia /> */}
    </div>
  );
};
export default Home;
