"use client";
import { Servico } from "@/types/servico";
import { createContext, useContext, useReducer, ReactNode } from "react";

//Types
type State = {
  currentStep: number;
  data: Date;
  horario: string;
  barbeiro: string;
  servico: Servico;
  nome: string;
  telefone: string;
  email: string;
};
type Action = {
  type: AgendamentoAction;
  payload: any;
};
type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};
type AgendamentoProviderProps = {
  children: ReactNode;
};
//Dados iniciais
const inicialData: State = {
  currentStep: 1,
  data: new Date(),
  horario: "",
  barbeiro: "",
  servico: {
    duracao: 0,
    id: "",
    nome: "",
    preco: 0,
    descricao: "",
  },
  nome: "",
  telefone: "",
  email: "",
};

//Context
const AgendamentoContext = createContext<ContextType | undefined>(undefined);

//Reducer
export enum AgendamentoAction {
  setcurrentStep,
  setData,
  setHorario,
  setBarbeiro,
  setServico,
  setNome,
  setTelefone,
  setEmail,
}
const AgendamentoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case AgendamentoAction.setcurrentStep:
      return { ...state, currentStep: action.payload };
    case AgendamentoAction.setData:
      return { ...state, data: action.payload };
    case AgendamentoAction.setHorario:
      return { ...state, horario: action.payload };
    case AgendamentoAction.setBarbeiro:
      return { ...state, barbeiro: action.payload };
    case AgendamentoAction.setServico:
      return { ...state, servico: action.payload };
    case AgendamentoAction.setNome:
      return { ...state, nome: action.payload };
    case AgendamentoAction.setTelefone:
      return { ...state, telefone: action.payload };
    case AgendamentoAction.setEmail:
      return { ...state, email: action.payload };
  }
};

//Provider
export const AgendamentoProvider = ({ children }: AgendamentoProviderProps) => {
  const [state, dispatch] = useReducer(AgendamentoReducer, inicialData);
  const value = { state, dispatch };
  return (
    <AgendamentoContext.Provider value={value}>
      {children}
    </AgendamentoContext.Provider>
  );
};

//Context Hook
export const useForm = () => {
  const context = useContext(AgendamentoContext);
  if (context === undefined) {
    throw new Error(
      "useForm precisa ser usado dentro de um AgendamentoProvider"
    );
  }
  return context;
};
