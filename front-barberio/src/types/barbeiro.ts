export interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  disponivel: boolean;
  avaliacao?: number;
  experiencia?: number;
  atendimentos?: number;
  servicos?: any[];
}
