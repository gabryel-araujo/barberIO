import { z } from "zod";

export const formSchemaFeriado = z.object({
  id: z.number().optional(),
  nome: z.string().optional(),
  data: z.string().optional(),
  recorrente: z.boolean().optional(),
});

const horarioSchema = z.object({
  id: z.number().optional(),
  aberto: z.boolean(),
  nome: z.string(),
  abertura: z.string(), // "08:00:00" → string no formato de hora
  fechamento: z.string(),
  codigo_dia: z.number().optional(),
});

export const configEmpresaSchema = z.object({
  id: z.number().optional(),
  aberto: z.boolean(),
  intervalo: z.number(),
  horarios: z.array(horarioSchema).optional(),
  feriados: z.array(formSchemaFeriado).optional(), // Pode ser ajustado se tiver estrutura
});

export const enderecoSchema = z.object({
  id: z.number().optional(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  cep: z.string(),
});

export const empresaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
  nacional_id: z.string().optional(), // CNPJ ou CPF com máscara
  org_id: z.number().nullable().optional(),
  endereco: enderecoSchema.optional(),
  config_empresa: configEmpresaSchema.optional(),
});
