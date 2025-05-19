import { Action, State } from "@/types/contextTypes";

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
export const AgendamentoReducer = (state: State, action: Action) => {
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
