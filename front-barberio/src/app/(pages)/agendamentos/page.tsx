"use client";
import { TitulosPages } from "@/components/layout/titulosPages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DELETEAgendamento, GETAgendamentos } from "@/lib/api/agendamento";
import { Agendamento } from "@/types/agendamento";
import { Calendar } from "@/components/ui/calendar";
import { CalendarX2, Clock, User, Scissors, DollarSign } from "lucide-react";
import { DialogComponent } from "@/components/layout/DialogComponent";
import { toast } from "sonner";
import { normalizarData } from "@/utils/functions";

const agendamentos = () => {
  const [open, setOpen] = useState(false);
  const idSelecionadoRef = useRef(0);
  const [selected, setSelected] = useState("hoje");
  const dateRef = useRef(
    format(Date.now(), "dd 'de' MMMM, yyyy", { locale: ptBR })
  );
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selecionada, setSelecionada] = useState(
    format(Date.now(), "dd 'de' MMMM, yyyy", { locale: ptBR })
  );

  const agendamentosFiltradosHoje = agendamentos
    .filter(
      (data) =>
        format(data.horario, "dd 'de' MMMM, yyyy", {
          locale: ptBR,
        }) == dateRef.current
    )
    .sort(
      (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
    );

  const agendamentosFiltradosProximos = agendamentos
    .filter(
      (data) =>
        normalizarData(new Date(data.horario)) >
        normalizarData(new Date(Date.now()))
    )
    .sort(
      (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
    );

  async function fetchData() {
    const response = await GETAgendamentos();
    setAgendamentos(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCancel() {
    const response = await DELETEAgendamento(idSelecionadoRef.current);
    console.log(response);

    if (response.status == 200) {
      toast.success(response.data);
      fetchData();
    } else {
      toast.error(response.data);
    }
  }

  // Componente para renderizar agendamentos em cards (mobile)
  const AgendamentoCard = ({
    agendamento,
    index,
  }: {
    agendamento: Agendamento;
    index: number;
  }) => (
    <Card key={index} className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span className="font-semibold">
              {format(agendamento.horario, selected === "hoje" ? "p" : "Pp", {
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-green-500" />
            <span>{agendamento.cliente.nome}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <DollarSign size={16} className="text-orange-500" />
            <span className="font-semibold text-green-600">
              R${agendamento.servico.preco.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User size={16} className="text-purple-500" />
          <span className="text-sm text-gray-600">
            Barbeiro: {agendamento.barbeiro.nome}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Scissors size={16} className="text-blue-500" />
          <span className="text-sm text-gray-600">
            Serviço: {agendamento.servico.nome}
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            setOpen(!open);
            idSelecionadoRef.current = agendamento.id;
          }}
        >
          Cancelar
        </Button>
        {/* <Button variant="default" size="sm" className="flex-1">
          Concluir
        </Button> */}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen w-full flex flex-col px-4 py-4 md:px-10 md:py-5 bg-[#e6f0ff]">
      <DialogComponent
        title="Tem certeza que deseja cancelar o agendamento?"
        actionLabel="Sim"
        open={open}
        setOpen={setOpen}
        action={handleCancel}
      />

      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <section>
          <TitulosPages
            Titulos="Agendamentos"
            subtitulo="Gerencie os agendamentos da barbearia"
          />
        </section>

        <section className="mt-4">
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4">
            <Button
              variant={selected == "hoje" ? "secondary" : "ghost"}
              onClick={() => setSelected("hoje")}
              className="w-full"
            >
              Hoje
            </Button>
            <Button
              variant={selected == "prox" ? "secondary" : "ghost"}
              onClick={() => setSelected("prox")}
              className="w-full"
            >
              Próximos
            </Button>
            <Button
              variant={selected == "calen" ? "secondary" : "ghost"}
              onClick={() => setSelected("calen")}
              className="w-full"
            >
              Calendário
            </Button>
          </div>
        </section>

        <section className="mt-5 flex-1">
          {/* Seção Hoje */}
          <Card className={`${selected != "hoje" && "hidden"} p-4 md:p-6`}>
            <div className="mb-4">
              <h1 className="text-xl font-semibold">Agendamentos de Hoje</h1>
              <p className="text-gray-500 text-sm">{dateRef.current}</p>
            </div>

            <div>
              {agendamentosFiltradosHoje.length > 0 ? (
                <>
                  {/* Tabela para desktop */}
                  <div className="hidden md:block">
                    <Table className="text-center">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Horário</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Barbeiro</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {agendamentosFiltradosHoje.map((agendamento, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {format(agendamento.horario, "p", {
                                locale: ptBR,
                              })}
                            </TableCell>
                            <TableCell>{agendamento.cliente.nome}</TableCell>
                            <TableCell>{agendamento.barbeiro.nome}</TableCell>
                            <TableCell>{agendamento.servico.nome}</TableCell>
                            <TableCell>
                              R${agendamento.servico.preco.toFixed(2)}
                            </TableCell>
                            <TableCell className="flex gap-2 items-center justify-center">
                              <Button
                                variant={"ghost"}
                                size="sm"
                                onClick={() => {
                                  setOpen(!open);
                                  idSelecionadoRef.current = agendamento.id;
                                }}
                              >
                                Cancelar
                              </Button>
                              {/* <Button variant={"link"} size="sm">
                                Concluir
                              </Button> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Cards para mobile */}
                  <div className="md:hidden space-y-3">
                    {agendamentosFiltradosHoje.map((agendamento, index) => (
                      <AgendamentoCard
                        key={index}
                        agendamento={agendamento}
                        index={index}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CalendarX2 size={50} className="text-slate-300" />
                  <h1 className="font-semibold text-slate-300 text-sm md:text-md text-center">
                    Nenhum agendamento encontrado para essa data
                  </h1>
                </div>
              )}
            </div>
          </Card>

          {/* Seção Próximos */}
          <Card className={`${selected != "prox" && "hidden"} p-4 md:p-6`}>
            <div className="mb-4">
              <h1 className="text-xl font-semibold">Próximos agendamentos</h1>
              <p className="text-gray-500 text-sm">
                Agendamentos dos próximos dias
              </p>
            </div>

            <div>
              {agendamentosFiltradosProximos.length > 0 ? (
                <>
                  {/* Tabela para desktop */}
                  <div className="hidden md:block">
                    <Table className="text-center">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Horário</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Barbeiro</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {agendamentosFiltradosProximos.map(
                          (agendamento, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {format(agendamento.horario, "Pp", {
                                  locale: ptBR,
                                })}
                              </TableCell>
                              <TableCell>{agendamento.cliente.nome}</TableCell>
                              <TableCell>{agendamento.barbeiro.nome}</TableCell>
                              <TableCell>{agendamento.servico.nome}</TableCell>
                              <TableCell>
                                R${agendamento.servico.preco.toFixed(2)}
                              </TableCell>
                              <TableCell className="flex gap-2 items-center justify-center">
                                <Button
                                  variant={"ghost"}
                                  size="sm"
                                  onClick={() => {
                                    setOpen(!open);
                                    idSelecionadoRef.current = agendamento.id;
                                  }}
                                >
                                  Cancelar
                                </Button>
                                {/* <Button variant={"link"} size="sm">
                                  Concluir
                                </Button> */}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Cards para mobile */}
                  <div className="md:hidden space-y-3">
                    {agendamentosFiltradosProximos.map((agendamento, index) => (
                      <AgendamentoCard
                        key={index}
                        agendamento={agendamento}
                        index={index}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CalendarX2 size={50} className="text-slate-300" />
                  <h1 className="font-semibold text-slate-300 text-sm md:text-md text-center">
                    Nenhum agendamento encontrado para essa data
                  </h1>
                </div>
              )}
            </div>
          </Card>

          {/* Seção Calendário */}
          <Card className={`${selected != "calen" && "hidden"} p-4 md:p-6`}>
            <div className="mb-4">
              <h1 className="text-xl font-semibold">
                Calendário de agendamentos
              </h1>
              <p className="text-gray-500 text-sm">
                Visualize os agendamentos por data
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="flex justify-center lg:justify-start">
                <Calendar
                  locale={ptBR}
                  mode="single"
                  selected={date}
                  onSelect={(dataSelecionada) => {
                    if (!dataSelecionada) return;
                    const formattedDate = format(
                      dataSelecionada,
                      "dd 'de' MMMM, yyyy",
                      {
                        locale: ptBR,
                      }
                    );
                    setDate(dataSelecionada);
                    setSelecionada(formattedDate);
                  }}
                  className="w-fit rounded-md border shadow"
                />
              </div>

              <div className="flex-1 lg:w-3/4">
                <Card className="p-4">
                  <p className="text-sm font-semibold mb-3">
                    Agendamentos para {selecionada}
                  </p>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {agendamentos
                      .filter(
                        (data) =>
                          format(data.horario, "dd 'de' MMMM, yyyy", {
                            locale: ptBR,
                          }) == selecionada
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.horario).getTime() -
                          new Date(b.horario).getTime()
                      )
                      .map((agendamento, index) => (
                        <Card key={index} className="p-3 bg-gray-50">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-blue-500" />
                              <span className="font-medium">
                                {format(agendamento.horario, "p", {
                                  locale: ptBR,
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-green-500" />
                              <span>{agendamento.cliente.nome}</span>
                            </div>
                          </div>
                        </Card>
                      ))}

                    {agendamentos.filter(
                      (data) =>
                        format(data.horario, "dd 'de' MMMM, yyyy", {
                          locale: ptBR,
                        }) == selecionada
                    ).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8">
                        <CalendarX2 size={40} className="text-slate-300" />
                        <p className="text-slate-300 text-sm text-center">
                          Nenhum agendamento para esta data
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default agendamentos;
