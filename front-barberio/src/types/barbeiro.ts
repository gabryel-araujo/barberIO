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
  servicos?: any[];
  avatar?: string;
  tipo: string;
  fechamento_ini?: Date;
  fechamento_fim?: Date;
}
