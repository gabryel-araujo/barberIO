import { Barbeiro } from "./barbeiro";
import { Cliente } from "./cliente";
import { Servico } from "./servico";

export type Agendamento = {
  id: number;
  horario: string;
  fim: string;
  barbeiro: Barbeiro;
  servico: Servico;
  cliente: Cliente;
};

export type AgendamentoPublic = {
  id: number;
  horario: string;
  fim: string;
  barbeiro: string;
  cliente: string;
  telefone: string;
  servico: string;
  preco: number;
};
