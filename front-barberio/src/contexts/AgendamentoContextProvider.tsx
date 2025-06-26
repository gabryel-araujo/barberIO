"use client";

import { createContext, useContext, useReducer } from "react";

import {
  AgendamentoProviderProps,
  ContextType,
  State,
} from "@/types/contextTypes";
import { AgendamentoReducer } from "./AgendamentoReducer";

//Dados iniciais
export const inicialData: State = {
  currentStep: 1,
  data: new Date(),
  horario: "",
  barbeiro: {
    id: 0,
    nome: "",
    data_nascimento: "",
    disponivel: true,
    email: "",
    senha: "",
    ativo: true,
  },
  servico: {
    duracao: 0,
    id: 0,
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
