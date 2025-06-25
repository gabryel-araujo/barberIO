export interface Cliente {
  id?: number | string;
  nome: string;
  telefone: string;
  ativo?: boolean;
  created_at?: Date;
}
//ID | NOME | TELEFONE
