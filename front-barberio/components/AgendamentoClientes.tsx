import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DELETEAgendamento, GETAgendamentos } from "@/lib/api/agendamento";
import { AgendamentoPublic } from "@/types/agendamento";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarX2 } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { normalizarData } from "@/utils/functions";
import { toast } from "sonner";
import { DialogComponent } from "@/components/layout/DialogComponent";

export const AgendamentoClientes = () => {
  const [agendamentos, setAgendamentos] = useState<AgendamentoPublic[]>([]);
  const clienteLogado = Cookies.get("telefoneCliente");
  const [open, setOpen] = useState(false);
  const idSelecionadoRef = useRef(0);

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
                            <TableCell>{agendamento.cliente}</TableCell>
                            <TableCell>{agendamento.barbeiro}</TableCell>
                            <TableCell>{agendamento.servico}</TableCell>
                            <TableCell>
                              R${agendamento.preco.toFixed(2)}
                            </TableCell>
                            <TableCell className="flex gap-2 items-center justify-center">
                              {/* <Button
                                onClick={reagendar}
                                variant={"ghost"}
                                size="sm"
                              >
                                Reagendar
                              </Button> */}
                              <Button
                                onClick={() => {
                                  setOpen(!open);
                                  idSelecionadoRef.current = agendamento.id;
                                }}
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
                <DialogComponent
                  title="Tem certeza que deseja cancelar o agendamento?"
                  actionLabel="Sim"
                  open={open}
                  setOpen={setOpen}
                  action={handleCancel}
                />
                {/* Versão Mobile (Cards em Grid) */}
                <div className="block md:hidden">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {agendamentosFiltradosProximos.map((agendamento, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {agendamento.cliente}
                              </p>
                              <p className="text-sm text-gray-500">
                                {format(agendamento.horario, "Pp", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Implementando
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">
                                Barbeiro:
                              </span>
                              <p className="text-gray-900">
                                {agendamento.barbeiro}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">
                                Serviço:
                              </span>
                              <p className="text-gray-900">
                                {agendamento.servico}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-lg font-semibold text-green-600">
                              R${agendamento.preco.toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                onClick={reagendar}
                                variant={"ghost"}
                                size="sm"
                                className="text-xs"
                              >
                                Reagendar
                              </Button>
                              <Button
                                onClick={cancelar}
                                variant={"destructive"}
                                size="sm"
                                className="text-xs"
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CalendarX2 size={50} className="text-slate-300" />
                <h1 className="font-semibold text-slate-300 text-sm md:text-md text-center">
                  Nenhum agendamento encontrado
                </h1>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
