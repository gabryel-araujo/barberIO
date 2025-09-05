import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GETAgendamentos } from "@/lib/api/agendamento";
import { AgendamentoPublic } from "@/types/agendamento";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarX2 } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { normalizarData } from "@/utils/functions";
import { toast } from "sonner";

export const AgendamentoClientes = () => {
  const [agendamentos, setAgendamentos] = useState<AgendamentoPublic[]>([]);
  const clienteLogado = Cookies.get("telefoneCliente");

  async function fetchData() {
    const response = await GETAgendamentos();
    setAgendamentos(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const agendamentosFiltradosProximos = agendamentos
    .filter(
      (data) =>
        normalizarData(new Date(data.horario)) >=
        normalizarData(new Date(Date.now()))
    )
    .filter((cliente) => cliente.telefone === clienteLogado)
    .sort(
      (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
    );

  function reagendar() {
    toast.warning("Irá reagendar em breve");
  }

  function cancelar() {
    toast.warning("Irá cancelar em breve");
  }

  return (
    <div className="w-full flex flex-col px-4 py-4 md:px-10 md:py-5 bg-[#e6f0ff]">
      {clienteLogado && (
        <Card className={`p-4 md:p-6`}>
          <div className="mb-4">
            <h1 className="text-xl font-semibold">Meus Agendamentos</h1>
            <p className="text-gray-500 text-sm">Gerencie seus agendamentos</p>
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
                        <TableHead>Status</TableHead>
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
                            <TableCell>{agendamento.cliente}</TableCell>
                            <TableCell>{agendamento.barbeiro}</TableCell>
                            <TableCell>{agendamento.servico}</TableCell>
                            <TableCell>
                              R${agendamento.preco.toFixed(2)}
                            </TableCell>
                            <TableCell>Implementando</TableCell>
                            <TableCell className="flex gap-2 items-center justify-center">
                              <Button
                                onClick={reagendar}
                                variant={"ghost"}
                                size="sm"
                              >
                                Reagendar
                              </Button>
                              <Button
                                onClick={cancelar}
                                variant={"destructive"}
                                size="sm"
                              >
                                Cancelar
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
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
      )}
    </div>
  );
};
