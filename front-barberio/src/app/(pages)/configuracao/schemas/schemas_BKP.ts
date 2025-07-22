import { z } from "zod";

export const formSchemaEndereco = z.object({
  id: z.number().optional(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  cep: z.string(),
  complemento: z.string().optional(),
  empresa_id: z.number().optional(),
});
export const formSchemaHorarioFuncionamento = z.object({
  id: z.number().optional(),
  aberto: z.boolean().optional(),
  nome: z.string().optional(),
  abertura: z.string().optional(),
  fechamento: z.string().optional(),
  configEmpresaId: z.number().optional(),
  // abertura: z.date(),
  // fechamento: z.date(),
});
export const formSchemaFeriado = z.object({
  id: z.number().optional(),
  nome: z.string().optional(),
  data: z.string().optional(),
  recorrente: z.boolean().optional(),
});

export const formSchemaConfigEmpresa = z.object({
  id: z.number().optional(),
  //empresa_id: z.number().optional(),
  aberto: z.boolean(),
  intervalo: z.coerce.number().optional(),
  feriados: z.array(formSchemaFeriado).optional(),
  ultima_alteracao: z.date().optional(),
  horarios: z.array(formSchemaHorarioFuncionamento).optional(),
});

export const formSchemaEmpresa = z.object({
  id: z.number().optional(),
  nome: z.string(),
  telefone: z.string(),
  email: z.string(),
  nacional_id: z.string().optional(),
  org_id: z.number().optional(),
  created_at: z.date().optional(),
  endereco: formSchemaEndereco.optional(),
  config_empresa: formSchemaConfigEmpresa.optional(),
});

export const formSchemaConfiguracao = z.object({
  empresa: formSchemaEmpresa.optional(),
  endereco: formSchemaEndereco.optional(),
  config: formSchemaConfigEmpresa.optional(),
  horario: z.array(formSchemaHorarioFuncionamento).optional(),
  feriado: formSchemaFeriado.optional(),
});
