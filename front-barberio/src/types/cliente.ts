export interface Cliente {
  id?: number | string;
  nome: string;
  telefone: string;
  ativo?: boolean;
  created_at?: Date;
  empresa_id?: number;
}
//ID | NOME | TELEFONE
