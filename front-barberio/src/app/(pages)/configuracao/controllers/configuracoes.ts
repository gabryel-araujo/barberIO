import axios from "axios";
import { z } from "zod";
import { empresaSchema } from "../schemas/schemas";
import { baseUrl } from "@/lib/baseUrl";

export const AtualizarEmpresa = async (
  id: number,
  empresa: z.infer<typeof empresaSchema>
) => {
  const response = await axios.put(`${baseUrl}/empresas/${id}`, empresa);
  return response.data;
};
