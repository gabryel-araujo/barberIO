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
  cep: z.number(),
  complemento: z.string().optional(),
  empresa_id: z.number().optional(),
});

export const formSchemaConfigEmpresa = z.object({
  id: z.number().optional(),
  empresa_id: z.number(),
  aberto: z.boolean(),
  intervalo: z.number(),
  horario_func_id: z.number(),
});

export const formSchemaHorario_funcionamento = z.object({
  id: z.number().optional(),
  status: z.boolean(),
  nome: z.string(),
  abertura: z.date(),
  fechamento: z.date(),
});
