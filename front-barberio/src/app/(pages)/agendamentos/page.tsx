"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DialogComponent } from "@/components/layout/DialogComponent";
import { TitulosPages } from "@/components/layout/titulosPages";
import {
  Clock,
  User,
  Scissors,
  CalendarX2,
  Filter,
  CalendarDays,
  X,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { GETAgendamentosAdmin, DELETEAgendamento } from "@/lib/api/agendamento";
import { AgendamentoPublic } from "@/types/agendamento";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatarTelefone, formatCurrency } from "@/utils/functions";
import Link from "next/link";
import { whatsapp } from "@/lib/whstsapp";

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<AgendamentoPublic[]>([]);
  const [filtered, setFiltered] = useState<AgendamentoPublic[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [cliente, setCliente] = useState<string>("");
  const [barbeiro, setBarbeiro] = useState<string>("");
  const [servico, setServico] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openCalendario, setOpenCalendario] = useState(false);
  const idSelecionadoRef = useRef<number>(0);

  async function fetchData() {
    try {
      const data = await GETAgendamentosAdmin();
      setAgendamentos(data);
      setFiltered(data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function limparFiltro() {
    setServico("all");
    setBarbeiro("all");
    setCliente("");
    setDate(new Date());
  }

  useEffect(() => {
    const filtrados = agendamentos
      .filter((a) => {
        const mesmaData =
          format(new Date(a.horario), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd");
        const clienteOk =
          !cliente || a.cliente.toLowerCase().includes(cliente.toLowerCase());
        const barbeiroOk =
          barbeiro === "all" ||
          !barbeiro ||
          a.barbeiro.toLowerCase().includes(barbeiro.toLowerCase());
        const servicoOk =
          servico === "all" ||
          !servico ||
          a.servico.toLowerCase().includes(servico.toLowerCase());
        return mesmaData && clienteOk && barbeiroOk && servicoOk;
      })
      .sort(
        (a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime()
      );
    setFiltered(filtrados);
  }, [agendamentos, date, cliente, barbeiro, servico]);

  async function handleCancel() {
    const response = await DELETEAgendamento(idSelecionadoRef.current);
    if (response.status === 200) {
      toast.success(response.data);
      fetchData();
    } else {
      toast.error(response.data);
    }
  }

  const AgendamentoCard = ({
    agendamento,
  }: {
    agendamento: AgendamentoPublic;
  }) => (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      {/* Header - Cliente + Telefone */}
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold text-base flex items-center gap-2">
            <User size={20} className="text-blue-500" />
            {agendamento.cliente}
          </span>
          <Link href={`${whatsapp}${agendamento.telefone}`}>
            <span className="text-sm text-green-600 flex gap-2 items-center font-bold">
              <MessageCircle size={20} className="text-green-600" />{" "}
              {formatarTelefone(agendamento.telefone) || "Sem telefone"}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
          {/* <DollarSign size={14} /> */}
          {formatCurrency(agendamento.preco)}
        </div>
      </div>

      {/* Body - Informações */}
      <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-500" />
          <span>{format(agendamento.horario, "p", { locale: ptBR })}</span>
        </div>

        <div className="flex items-center gap-2">
          <Scissors size={16} className="text-purple-500" />
          <span>{agendamento.servico}</span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} className="text-amber-500" />
          <span>{agendamento.barbeiro}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <CalendarDays size={16} />
          <span>
            {format(agendamento.horario, "dd/MM/yyyy", { locale: ptBR })}
          </span>
        </div>
      </div>

      {/* Footer - Botão */}
      <div className="pt-3 border-t mt-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            idSelecionadoRef.current = agendamento.id;
            setOpen(true);
          }}
          className="w-full rounded-lg font-medium tracking-wide"
        >
          Cancelar Agendamento
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen w-full flex flex-col px-4 py-6 md:px-10 bg-[#f8fafc]">
      <DialogComponent
        title="Tem certeza que deseja cancelar o agendamento?"
        actionLabel="Sim"
        open={open}
        setOpen={setOpen}
        action={handleCancel}
      />

      <div className="w-full max-w-7xl mx-auto space-y-6">
        <TitulosPages
          Titulos="Agendamentos"
          subtitulo="Visualize e gerencie os agendamentos da barbearia"
        />

        {/* FILTROS */}
        <Card className="p-4 shadow-sm border bg-white">
          <Accordion type="single" collapsible>
            <AccordionItem value="filtros">
              <AccordionTrigger className="flex items-center text-xl py-2 cursor-pointer">
                <p className="flex items-center gap-3">
                  <Filter size={16} />
                  Filtros
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex md:flex-row flex-col md:items-end md:justify-between gap-4 mt-3">
                  {/* Cliente */}
                  <div className="flex flex-col w-full md:w-1/4 pl-1">
                    <span className="text-sm font-bold text-gray-500 mb-1">
                      Cliente
                    </span>
                    <Input
                      placeholder="Buscar cliente..."
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                    />
                  </div>

                  {/* Barbeiro */}
                  <div className="flex flex-col w-full md:w-1/4">
                    <span className="text-sm font-bold text-gray-500 mb-1">
                      Barbeiro
                    </span>
                    <Select value={barbeiro} onValueChange={setBarbeiro}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos barbeiros" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="all">Todos</SelectItem>
                        {Array.from(
                          new Set(agendamentos.map((a) => a.barbeiro))
                        ).map((barb, i) => (
                          <SelectItem key={i} value={barb}>
                            {barb}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Barbeiro */}
                  <div className="flex flex-col w-full md:w-1/4">
                    <span className="text-sm font-bold text-gray-500 mb-1">
                      Serviço
                    </span>
                    <Select value={servico} onValueChange={setServico}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos barbeiros" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="all">Todos</SelectItem>
                        {Array.from(
                          new Set(agendamentos.map((a) => a.servico))
                        ).map((serv, i) => (
                          <SelectItem key={i} value={serv}>
                            {serv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* CONTROLE DE DATA */}
                  <div className="flex flex-col w-full md:w-1/4">
                    <span className="text-sm font-bold text-gray-500 mb-1">
                      Data
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Popover do calendário */}
                      <Popover
                        open={openCalendario}
                        onOpenChange={setOpenCalendario}
                      >
                        <PopoverTrigger className="w-full">
                          <Button
                            variant="outline"
                            className="flex items-center w-full gap-2 justify-center text-gray-600"
                          >
                            <CalendarDays className="h-4 w-4" />
                            {format(date, "dd/MM/yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-2 w-auto z-[9999] overflow-hidden"
                          align="end"
                        >
                          <Calendar
                            locale={ptBR}
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                              if (d) {
                                setDate(d);
                                setOpenCalendario(false);
                              }
                            }}
                            className="rounded-md border shadow-sm"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => limparFiltro()}
                    type="button"
                    variant={"outline"}
                    className="flex w-full mt-4 text-xs md:w-[24%] font-semibold text-gray-600 items-center"
                  >
                    <X />
                    Limpar Filtro
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* LISTAGEM */}
        <Card className="p-4 shadow-sm border bg-white">
          {filtered.length > 0 ? (
            <>
              {/* Tabela Desktop */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-gray-600">
                        Horário
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Cliente
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Telefone
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Barbeiro
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Serviço
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Valor
                      </TableHead>
                      <TableHead className="font-bold text-gray-600">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {format(a.horario, "p", { locale: ptBR })}
                        </TableCell>
                        <TableCell>{a.cliente}</TableCell>
                        <TableCell>
                          <Link href={`${whatsapp}${a.telefone}`}>
                            {" "}
                            {formatarTelefone(a.telefone)}
                          </Link>
                        </TableCell>
                        <TableCell>{a.barbeiro}</TableCell>
                        <TableCell>{a.servico}</TableCell>
                        <TableCell>
                          {formatCurrency(a.preco.toFixed(2))}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              idSelecionadoRef.current = a.id;
                              setOpen(true);
                            }}
                          >
                            Cancelar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Cards Mobile */}
              <div className="md:hidden space-y-3">
                {filtered.map((a, i) => (
                  <AgendamentoCard key={i} agendamento={a} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarX2 size={48} className="text-slate-300" />
              <p className="text-gray-400 mt-2">
                Nenhum agendamento encontrado para esta data
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
