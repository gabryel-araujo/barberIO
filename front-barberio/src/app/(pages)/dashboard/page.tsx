"use client";
import { CardGrande } from "@/components/layout/Dashboard/cardGrande";
import { CardPequeno } from "@/components/layout/Dashboard/cardPequeno";
import { TitulosPages } from "@/components/layout/titulosPages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { baseUrl } from "@/lib/baseUrl";
import { ConversaoData, obterHoras, obterNomeMes } from "@/lib/utils";
import { Agendamento } from "@/types/agendamento";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar, Scissors, Users2 } from "lucide-react";
import { useState } from "react";

const dashboard = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [hoje, setHoje] = useState(new Date());
  useQuery({
    queryKey: ["agendamentos"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/agendamentos`);
      console.log(response.data);
      setAgendamentos(response.data);
      return response.data;
    },
  });

  const agendamentosDoDia: Agendamento[] = agendamentos.filter(
    (age) => ConversaoData(age.horario) === ConversaoData(hoje)
  );

  return (
    <div className="w-screen min-h-screen flex bg-[#e6f0ff]">
      <div className="w-full flex flex-col px-10 py-5">
        <TitulosPages
          Titulos="Dashboard"
          subtitulo="Bem-vindo ao seu sistema de agendamentos."
        />
        {/* inicio de cards dashboard */}
        <div className="pt-10 flex flex-col gap-5 md:flex-row">
          <CardPequeno
            Titulo="Agendamentos Hoje"
            Quantidade={20}
            Legenda={`${hoje.getDate()} de ${obterNomeMes(hoje)}`}
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
        <div className="pt-5 flex gap-5 flex-col md:flex-row ">
          <CardGrande
            Titulo="Agenda do Dia"
            Legenda={`Agendamentos para hoje: ${hoje.getDate()} de ${obterNomeMes(
              hoje
            )} de ${hoje.getFullYear()}`}
          >
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>Serviço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agendamentosDoDia.map((agendamento: Agendamento) => (
                    <TableRow key={agendamento.id}>
                      <TableCell>
                        {/* {ConversaoData(agendamento.horario)} -{" "} */}
                        {obterHoras(agendamento.horario)}
                      </TableCell>
                      <TableCell>{agendamento.cliente.nome}</TableCell>
                      <TableCell>{agendamento.barbeiro.nome}</TableCell>
                      <TableCell>{agendamento.servico.nome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardGrande>
          <CardGrande
            Titulo="Próximos Agendamentos"
            Legenda="Agendamentos dos próximos dias"
          >
            <div>Conteúdo da tabela</div>
          </CardGrande>
        </div>
      </div>
    </div>
  );
};
export default dashboard;
