import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Servico } from "./servico";

export type AgendamentoProviderProps = {
  children: React.ReactNode;
};

export type State = {
  currentStep: number;
  data: Date;
  horario: string;
  barbeiro: string;
  servico: Servico;
  nome: string;
  telefone: string;
  email: string;
};

export type Action = {
  type: AgendamentoAction;
  payload: any;
};

export type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};
