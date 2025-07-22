import axios from "axios";
import { z } from "zod";
import { empresaSchema, enderecoSchema } from "../schemas/schemas";
import { baseUrl } from "@/lib/baseUrl";

export const AtualizarEmpresa = async (
  id: number,
  empresa: z.infer<typeof empresaSchema>
) => {
  const response = await axios.put(`${baseUrl}/empresas/${id}`, empresa);
  return response.data;
};

export const AtualizaEndereco = async (
  id: number,
  endereco: z.infer<typeof enderecoSchema>
) => {
  const response = await axios.put(`${baseUrl}/enderecos/${id}`, endereco);
  return response.data;
};
