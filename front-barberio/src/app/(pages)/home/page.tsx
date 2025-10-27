"use client";

import Cookies from "js-cookie";
import { PrefetchAgendar } from "../../../../components/PrefetchAgendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BotaoMeusAgendamentos } from "../../../../components/BotaoMeusAgendamentos";
import { MensagemPadrao } from "../../../../components/MensagemPadrao";
import { AgendamentoClientes } from "../../../../components/AgendamentoClientes";
import { BannerHome } from "../../../../components/bannerHome";
import { formatarTelefone } from "@/utils/functions";
import { useQuery } from "@tanstack/react-query";
import { empresaSchema } from "../configuracao/schemas/schemas";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../configuracao/page";
import { baseUrl } from "@/lib/baseUrl";

const Home = () => {
  const gestorLogado = Cookies.get("authToken");
  const empresaId = window.location.href.split("=")[1];

  const { data } = useQuery<
    z.infer<typeof empresaSchema>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["empresas"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/empresas/${empresaId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * (60 * 1000),
  });

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center space-y-7 px-7 pt-7 md:pt-0 bg-[#e6f0ff]">
      <PrefetchAgendar />

      {/* <p className="text-5xl font-bold text-center ">
        Bem-Vindo à <span className="text-primary">Barber</span>iO
      </p>
      <p className="text-slate-500 text-xl text-center">
        Agende seu horário de forma rápida e fácil com os melhores barbeiros da
        cidade.
      </p> */}
      <BannerHome
        nomeBarbearia={data?.nome!}
        imagemBarbaria="/imagens/barbeariaBeta.png"
        emailBarbearia={data?.email!}
        telefoneBarbearia={formatarTelefone(data?.telefone!)}
        ruaBarbearia={data?.endereco?.rua!}
        numeroBarbearia={data?.endereco?.numero!}
        bairroBarbearia={data?.endereco?.bairro!}
        cidadeBarbearia={data?.endereco?.cidade!}
      />
      <div className="flex flex-col items-center md:flex-row ">
        <div className="flex items-center">
          <Button asChild className="rounded-sm bg-primary h-12 w-60">
            <Link href={`/agendar?ref=${empresaId}`}>
              <Calendar /> <p className="font-bold text-lg">Agendar Horário</p>
            </Link>
          </Button>
        </div>
        {!gestorLogado && (
          <div className="md:pl-5 md:pt-0 pt-3">
            {" "}
            <BotaoMeusAgendamentos />
          </div>
        )}
      </div>
      <MensagemPadrao />
      <AgendamentoClientes />
      {/* <ImagemBarbearia /> */}
    </div>
  );
};
export default Home;
