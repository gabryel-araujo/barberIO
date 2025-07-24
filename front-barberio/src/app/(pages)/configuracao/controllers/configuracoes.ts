import axios from "axios";
import { z } from "zod";
import {
  empresaSchema,
  enderecoSchema,
  formSchemaFeriado,
  configEmpresaSchema,
} from "../schemas/schemas";
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

export const AtualizarConfigEmpresa = async (
  config_id: number,
  empresa_id: number,
  config_empresa: z.infer<typeof configEmpresaSchema>
) => {
  const response = await axios.put(
    `${baseUrl}/configEmpresa/?config_id=${config_id}&empresa_id=${empresa_id}`,
    config_empresa
  );
  return response.data;
};

export const CriarFeriado = async (
  config_id: number,
  feriados: z.infer<typeof formSchemaFeriado>
) => {
  const response = await axios.post(
    `${baseUrl}/feriados/${config_id}`,
    feriados
  );
  return response.data;
};

export const EditarFeriado = async (
  id: number,
  feriados: z.infer<typeof formSchemaFeriado>
) => {
  const response = await axios.put(`${baseUrl}/feriados/${id}`, feriados);
  return response.data;
};

export const DeletarFeriado = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/feriados/${id}`);
  return response.data;
};
