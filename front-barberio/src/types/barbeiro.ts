export interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  disponivel: boolean;
  ativo?: boolean;
  avaliacao?: number;
  experiencia?: number;
  atendimentos?: number;
  avatar?: string;
  tipo?: string;
  servicos?: any[];
  avatar?: string;
  tipo: string;
}
