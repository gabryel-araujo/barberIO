export interface Barbeiro {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  avatar?: string;
  servicos: string[];
  isDisponivel: boolean;
}

export interface BarbeiroApi {
  id: number;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  avaliacao: number;
  experiencia: number;
  atendimentos: number;
  servicos: [];
}
