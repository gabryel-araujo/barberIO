"use client";
import { ButtonLembrete } from "@/components/layout/Dashboard/buttonLembretes";
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
import { whatsapp } from "@/lib/whstsapp";
import { Agendamento } from "@/types/agendamento";
import { Barbeiro } from "@/types/barbeiro";
import { Servico } from "@/types/servico";
import { formatarTelefone } from "@/utils/functions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar, Scissors, Users2 } from "lucide-react";
import React, { useState } from "react";

const dashboard = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [hoje] = useState(new Date());
  const [expandido, setExpandido] = useState<number | null>(null);
  const [expandidoProximo, setExpandidoProximo] = useState<number | null>(null);

  useQuery({
    queryKey: ["agendamentos", "serviços"],
    queryFn: async () => {
      const responseAgendamento = await axios.get(`${baseUrl}/agendamentos`);
      const responseServico = await axios.get(`${baseUrl}/servico`);
      const responseBarbeiro = await axios.get(`${baseUrl}/funcionarios`);

      console.log(responseAgendamento.data);
      console.log(responseServico.data);
      console.log(responseBarbeiro.data);

      const agendamentos = responseAgendamento.data;
      const servicos = responseServico.data;
      const barbeiros = responseBarbeiro.data;
      const barbeiroAtivo = barbeiros.filter(
        (barbeiro: Barbeiro) =>
          barbeiro.ativo === true && barbeiro.disponivel === true
      );

      setServicos(responseServico.data);
      setAgendamentos(responseAgendamento.data);
      setBarbeiros(barbeiroAtivo);
      return { agendamentos, servicos, barbeiroAtivo };
    },
  });
  function normalizarData(data: Date): Date {
    return new Date(data.getFullYear(), data.getMonth(), data.getDate());
  }

  const agendamentosDoDia: Agendamento[] = agendamentos
    .filter((age) => ConversaoData(age.horario) === ConversaoData(hoje))
    .sort(
      (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
    );

  const proximosAgendamentos: Agendamento[] = agendamentos
    .filter(
      (age) => normalizarData(new Date(age.horario)) > normalizarData(hoje)
    )
    .sort(
      (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
    );

  return (
    <div className="w-screen min-h-screen flex bg-[#e6f0ff]">
      <div className="w-full flex flex-col md:px-10 px-3 py-5">
        <TitulosPages
          Titulos="Dashboard"
          subtitulo="Bem-vindo ao seu sistema de agendamentos."
        />
        {/* inicio de cards dashboard */}
        <div className="pt-10 flex flex-col gap-5 md:flex-row">
          <CardPequeno
            Titulo="Agendamentos Hoje"
            Quantidade={agendamentosDoDia.length}
            Legenda={`${hoje.getDate()} de ${obterNomeMes(hoje)}`}
            Icon={<Calendar />}
          />
          <CardPequeno
            Titulo="Serviços"
            Quantidade={
              servicos.filter((servico: Servico) => servico.ativo === true)
                .length
            }
            Legenda="serviços disponíveis"
            Icon={<Scissors />}
          />
          <CardPequeno
            Titulo="Barbeiros"
            Quantidade={barbeiros.length}
            Legenda="profissionais disponíveis"
            Icon={<Users2 />}
          />
        </div>

        <div className="pt-5 flex gap-5 flex-col lg:flex-row ">
          <div className="lg:w-1/2">
            <CardGrande
              Titulo="Agenda do Dia"
              Legenda={`Agendamentos para: ${hoje.getDate()} de ${obterNomeMes(
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
                  <TableBody className="">
                    {agendamentosDoDia.map(
                      (agendamento: Agendamento, index) => (
                        <React.Fragment key={agendamento.id}>
                          <TableRow
                            // key={agendamento.id}
                            className="hover:bg-slate-200 cursor-pointer "
                            onClick={() =>
                              setExpandido(expandido === index ? null : index)
                            }
                          >
                            <TableCell>
                              {obterHoras(agendamento.horario)}
                            </TableCell>
                            <TableCell>{agendamento.cliente.nome}</TableCell>
                            <TableCell>{agendamento.barbeiro.nome}</TableCell>
                            <TableCell>{agendamento.servico.nome}</TableCell>
                          </TableRow>
                          {expandido === index && (
                            <TableRow className="">
                              <td
                                colSpan={4}
                                className="p-3  bg-slate-200 rounded-b-2xl active:bg-slate-200"
                              >
                                <div className="flex flex-col gap-3">
                                  <p className="flex items-center justify-center font-semibold">
                                    Detalhamento de Agendamento
                                  </p>
                                  <div className="border-y border-slate-300 p-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Cliente
                                    </p>
                                    <div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="font-semibold text-slate-500">
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Telefone</TableCell>
                                            <TableCell>Cliente Deste</TableCell>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          <TableRow className="text-slate-500">
                                            <TableCell>
                                              {agendamento.cliente.nome}
                                            </TableCell>
                                            <TableCell>
                                              {formatarTelefone(
                                                agendamento.cliente.telefone
                                              )}
                                            </TableCell>
                                            <TableCell>01/01/1990</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                  <div className="p-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Barbeiro ⭐
                                    </p>
                                    <div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="font-semibold text-slate-500">
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Avaliação</TableCell>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          <TableRow className="text-slate-500">
                                            <TableCell>
                                              {agendamento.barbeiro.nome}
                                            </TableCell>
                                            <TableCell>
                                              {agendamento.barbeiro.experiencia}
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                  <div className="border-y border-slate-300 p-2 space-y-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Serviço
                                    </p>
                                    <div className="flex items-center justify-between px-5">
                                      <div className="flex flex-col">
                                        <p className="font-semibold text-lg text-slate-600">
                                          {agendamento.servico.nome}
                                        </p>
                                        <p className="text-slate-500">
                                          {agendamento.servico.descricao}
                                        </p>
                                      </div>
                                      <div className="text-slate-600 font-semibold">
                                        R${" "}
                                        {agendamento.servico.preco.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <p className="flex items-center justify-center font-semibold">
                                      Funções de Enviar Lembrete
                                    </p>
                                    <div className="flex items-center justify-center">
                                      <ButtonLembrete
                                        mensagem="Mensagem será enviada pelo Whatsapp Web"
                                        link={`${whatsapp}${agendamento.cliente.telefone}`}
                                      >
                                        Whatsapp Web
                                      </ButtonLembrete>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </TableRow>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardGrande>
          </div>
          <div className="lg:w-1/2">
            <CardGrande
              Titulo="Próximos Agendamentos"
              Legenda={`Agendamentos dos próximos dias`}
            >
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Barbeiro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {proximosAgendamentos.map(
                      (agendamentoProx: Agendamento, index) => (
                        <React.Fragment key={agendamentoProx.id}>
                          <TableRow
                            //key={agendamentoProx.id}
                            className="hover:bg-slate-200 cursor-pointer "
                            onClick={() =>
                              setExpandidoProximo(
                                expandidoProximo === index ? null : index
                              )
                            }
                          >
                            <TableCell>
                              {ConversaoData(agendamentoProx.horario)}
                            </TableCell>
                            <TableCell>
                              {obterHoras(agendamentoProx.horario)}
                            </TableCell>
                            <TableCell>
                              {agendamentoProx.cliente.nome}
                            </TableCell>
                            <TableCell>
                              {agendamentoProx.barbeiro.nome}
                            </TableCell>
                          </TableRow>
                          {expandidoProximo === index && (
                            <TableRow className="">
                              <td
                                colSpan={4}
                                className="p-3  bg-slate-200 rounded-b-2xl active:bg-slate-200"
                              >
                                <div className="flex flex-col gap-3">
                                  <p className="flex items-center justify-center font-semibold">
                                    Detalhamento de Agendamento
                                  </p>
                                  <div className="border-y border-slate-300 p-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Cliente
                                    </p>
                                    <div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="font-semibold text-slate-500">
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Talefone</TableCell>
                                            <TableCell>Cliente Deste</TableCell>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          <TableRow className="text-slate-500">
                                            <TableCell>
                                              {agendamentoProx.cliente.nome}
                                            </TableCell>
                                            <TableCell>
                                              {agendamentoProx.cliente.telefone}
                                            </TableCell>
                                            <TableCell>01/01/1990</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                  <div className="p-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Barbeiro ⭐
                                    </p>
                                    <div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="font-semibold text-slate-500">
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Avaliação</TableCell>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          <TableRow className="text-slate-500">
                                            <TableCell>
                                              {agendamentoProx.barbeiro.nome}
                                            </TableCell>
                                            <TableCell>
                                              {
                                                agendamentoProx.barbeiro
                                                  .experiencia
                                              }
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                  <div className="border-y border-slate-300 p-2 space-y-2">
                                    <p className="flex items-center font-semibold">
                                      Dados Serviço
                                    </p>
                                    <div className="flex items-center justify-between px-5">
                                      <div className="flex flex-col">
                                        <p className="font-semibold text-lg text-slate-600">
                                          {agendamentoProx.servico.nome}
                                        </p>
                                        <p className="text-slate-500">
                                          {agendamentoProx.servico.descricao}
                                        </p>
                                      </div>
                                      <div className="text-slate-600 font-semibold">
                                        R${" "}
                                        {agendamentoProx.servico.preco.toFixed(
                                          2
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <p className="flex items-center justify-center font-semibold">
                                      Funções de Enviar Lembrete
                                    </p>
                                    <div className="flex items-center justify-center">
                                      <ButtonLembrete
                                        mensagem="Mensagem será enviada pelo Whatsapp Web"
                                        link={`${whatsapp}${agendamentoProx.cliente.telefone}`}
                                      >
                                        Whatsapp Web
                                      </ButtonLembrete>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </TableRow>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardGrande>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dashboard;
