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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "../../../../components/LoadingComponent";

const Home = () => {
  const router = useRouter();
  const [empresaId, setEmpresaId] = useState<string | null>(null);

  const gestorLogado = Cookies.get("authToken");

  // 🔥 Captura o empresaId de forma segura
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get("ref");
    const refFromCookie = Cookies.get("ref");

    if (refFromUrl) {
      // Garante que o cookie também tem o ref
      Cookies.set("ref", refFromUrl, { expires: 7 });
      setEmpresaId(refFromUrl);
    } else if (refFromCookie) {
      // Se não tem ref na URL, redireciona pra incluir
      router.replace(`/home?ref=${refFromCookie}`);
      setEmpresaId(refFromCookie);
    }
  }, [router]);

  // 🚫 Só faz a requisição se o empresaId estiver pronto
  const { data } = useQuery<
    z.infer<typeof empresaSchema>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["empresas", empresaId],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/empresas/${empresaId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return response.data;
    },
    enabled: !!empresaId, // só executa quando empresaId estiver definido
    staleTime: 5 * 60 * 1000,
  });

  if (!empresaId || !data) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#e6f0ff]">
        <p>
          <LoadingComponent />
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center space-y-7 px-7 pt-7 md:pt-0 bg-[#e6f0ff]">
      <PrefetchAgendar />
      <BannerHome
        nomeBarbearia={data?.nome!}
        imagemBarbaria={
          data?.url_img ? data?.url_img : "/imagens/barbeariaBeta.png"
        }
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
    </div>
  );
};
export default Home;
