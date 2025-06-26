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
import { GETAgendamentos } from "@/lib/api/agendamento";
import { Agendamento } from "@/types/agendamento";

const agendamentos = () => {
  const [selected, setSelected] = useState("hoje");
  const dateRef = useRef(
    format(Date.now(), "dd 'de' MMMM, yyyy", { locale: ptBR })
  );
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await GETAgendamentos();
      setAgendamentos(response);
    }
    fetchData();
  }, []);

  console.log(agendamentos);

  return (
    <div className="w-screen h-screen flex px-10 py-5 bg-[#e6f0ff]">
      <div className="flex flex-col w-full">
        <section>
          <TitulosPages
            Titulos="Agendamentos"
            subtitulo="Gerencie os agendamentos da barbearia"
          ></TitulosPages>
        </section>
        <section className="mt-4">
          <div className="grid grid-cols-3  gap-4">
            <Button
              variant={selected == "hoje" ? "secondary" : "ghost"}
              onClick={() => setSelected("hoje")}
            >
              Hoje
            </Button>
            <Button
              variant={selected == "prox" ? "secondary" : "ghost"}
              onClick={() => setSelected("prox")}
            >
              Próximos
            </Button>
            <Button
              variant={selected == "calen" ? "secondary" : "ghost"}
              onClick={() => setSelected("calen")}
            >
              Calendário
            </Button>
          </div>
        </section>

        <section className="mt-5">
          <Card className={`${selected != "hoje" && "hidden"}`}>
            <span>
              <h1 className="text-xl font-semibold">Agendamentos de Hoje</h1>
              <p className="text-gray-500">{dateRef.current}</p>
            </span>

            <div>
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
                  {agendamentos
                    .filter(
                      (data) =>
                        format(data.horario, "dd 'de' MMMM, yyyy", {
                          locale: ptBR,
                        }) == dateRef.current
                    )
                    .sort(
                      (a, b) =>
                        new Date(a.horario).getTime() -
                        new Date(b.horario).getTime()
                    )
                    .map((agendamento, index) => {
                      return (
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
                            <Button variant={"ghost"}>Cancelar</Button>
                            <Button variant={"link"}>Concluir</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </Card>
          <Card className={`${selected != "prox" && "hidden"}`}>
            <h1 className="text-xl font-semibold">Próximos agendamentos</h1>
          </Card>
          <Card className={`${selected != "calen" && "hidden"}`}>
            <h1 className="text-xl font-semibold">
              Calendário de agendamentos
            </h1>
          </Card>
        </section>
      </div>
    </div>
  );
};
export default agendamentos;
