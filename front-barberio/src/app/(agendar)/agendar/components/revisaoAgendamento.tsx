import {
  dataFormatada,
  formatarTelefone,
  formatCurrency,
} from "@/utils/functions";
import { Calendar, Clock, Scissors, Sparkles, User } from "lucide-react";

interface RevisaoAgendamentoProps {
  nomeBarbeiro: string;
  fotoBarbeiro: string;
  qtdCortes: number;
  nomeServico: string;
  duracaoServico: number;
  valorServico: number;
  dataAgendamento: Date;
  horarioAgendamento: string;
  nomeCliente: string;
  telefoneCliente: string;
}

export const RevisaoAgendamento = ({
  nomeBarbeiro,
  fotoBarbeiro,
  qtdCortes,
  nomeCliente,
  duracaoServico,
  valorServico,
  dataAgendamento,
  horarioAgendamento,
  nomeServico,
  telefoneCliente,
}: RevisaoAgendamentoProps) => {
  return (
    <div className="h-full sm:max-w-2xl space-y-3 md:space-y-3 overflow-auto">
      <div className="w-full md:flex space-y-3 md:space-y-0 md:gap-3">
        <div className="space-y-3 flex-1 bg-primary/5 p-4 border border-primary/30 rounded-md">
          <p className="flex gap-2 text-sm font-semibold text-primary">
            <User size={20} /> BARBEIRO
          </p>
          <div className="flex gap-2 items-center">
            <img
              src={fotoBarbeiro}
              alt="imagem do barbeiro"
              className="h-16 w-16 rounded-full border-4 border-[#3f89c5] object-cover"
            />
            <div className="space-y-1">
              <p className="font-bold">{nomeBarbeiro}</p>
              <p className="text-sm font-semibold text-muted-foreground">
                Quantidade de Cortes: {qtdCortes}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3 flex-1 bg-primary/5 p-4 border border-primary/30 rounded-md">
          <p className="flex gap-2 text-sm font-semibold text-primary">
            <Scissors size={20} /> SERVIÇO
          </p>
          <div>
            <p className="font-bold">{nomeServico}</p>
            <div className="flex items-center justify-between px-2">
              <p className="flex items-center font-semibold gap-2 text-sm text-muted-foreground">
                <Clock /> {duracaoServico} min
              </p>
              <p className="font-bold text-2xl text-primary">
                {formatCurrency(valorServico)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1 bg-primary/5 p-4 border border-primary/30 rounded-md">
        <p className="flex gap-2 text-sm font-semibold text-primary">
          <Calendar size={20} /> DATA E HORÁRIO
        </p>
        <div className="flex items-center justify-between px-2">
          <div>
            <p className="text-sm text-muted-foreground">Data</p>
            <p className="text-lg font-bold">
              {dataFormatada(dataAgendamento)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Horário</p>
            <p className="text-lg font-bold">
              {horarioAgendamento.split(":").slice(0, 2).join(":")}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1 bg-primary/5 p-4 border border-primary/30 rounded-md">
        <p className="flex gap-2 text-sm font-semibold text-primary">
          <User size={20} /> SEUS DADOS
        </p>
        <div className="flex items-center justify-evenly">
          <div>
            <p className="text-sm text-muted-foreground">Nome</p>
            <p className="text-lg font-bold">{nomeCliente}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Telefone</p>
            <p className="text-lg font-bold">
              {formatarTelefone(telefoneCliente)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-y-3 flex-1 bg-primary text-slate-100 p-4 border border-primary/30 rounded-md">
        <div>
          <p className="font-semibold">Valor Total</p>
          <p className="text-4xl font-black">{formatCurrency(valorServico)}</p>
        </div>
        <div>
          <Sparkles size={50} />
        </div>
      </div>
    </div>
  );
};
