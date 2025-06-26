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
