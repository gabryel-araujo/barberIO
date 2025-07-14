import { z } from "zod";

export const formSchemaEmpresa = z.object({
  id: z.number().optional(),
  nome: z.string(),
  telefone: z.string(),
  email: z.string(),
  nacional_id: z.string().optional(),
  org_id: z.number().optional(),
});

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

export const formSchemaConfigEmpresa = z.object({
  id: z.number().optional(),
  empresa_id: z.number().optional(),
  aberto: z.boolean(),
  intervalo: z.coerce.number().optional(),
  horario_func_id: z.number().optional(),
  ultima_alteracao: z.date().optional(),
});

export const formSchemaHorarioFuncionamento = z.object({
  id: z.number().optional(),
  status: z.boolean().optional(),
  nome: z.string().optional(),
  abertura: z.string().optional(),
  fechamento: z.string().optional(),
  // abertura: z.date(),
  // fechamento: z.date(),
});

export const formSchemaConfiguracao = z.object({
  empresa: formSchemaEmpresa.optional(),
  endereco: formSchemaEndereco.optional(),
  config: formSchemaConfigEmpresa.optional(),
  horario: z.array(formSchemaHorarioFuncionamento).optional(),
});
