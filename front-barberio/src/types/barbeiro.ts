import { Servico } from "./servico";

export interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
  disponivel?: boolean;
  ativo?: boolean;
  avaliacao?: number;
  experiencia?: number;
  atendimentos?: number;
  servicos?: Servico[];
  avatar?: string;
  tipo: string;
  fechamento_ini?: string | null;
  fechamento_fim?: string | null;
  comissao?: number;
}
export type BarbeiroFormData = {
  nome: string;
  email: string;
  senha?: string;
  data_nascimento?: string | null;
  servico?: any[]; //
  disponivel: boolean;
  avatar?: string | null;
  tipo: string;
  fechamento_ini?: string;
  fechamento_fim?: string;
};
