import axios from "axios";
import { z } from "zod";
import { empresaSchema, enderecoSchema } from "../schemas/schemas";
import { baseUrl } from "@/lib/baseUrl";
import { formSchemaConfigEmpresa } from "../schemas/schemas_BKP";

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

export const AtualizarConfigEmpresa = async (
  config_id: number,
  empresa_id: number,
  config_empresa: z.infer<typeof formSchemaConfigEmpresa>
) => {
  const response = await axios.put(
    `${baseUrl}/configEmpresa/?config_id=${config_id}&empresa_id=${empresa_id}`,
    config_empresa
  );
  return response.data;
};
