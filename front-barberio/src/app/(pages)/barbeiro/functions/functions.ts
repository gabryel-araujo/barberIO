import { baseUrl } from "@/lib/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";

export async function adicionarServico(idBarbeiro: number, idServico: number) {
  try {
    const response = await axios.patch(
      `${baseUrl}/funcionarios/${idBarbeiro}/adicionarServico/${idServico}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Erro na requisição";

    throw new Error(`(${status}) ${message}`);
  }
}

export async function removerServico(idBarbeiro: number, idServico: number) {
  try {
    const response = await axios.patch(
      `${baseUrl}/funcionarios/${idBarbeiro}/removerServico/${idServico}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Erro na requisição";

    throw new Error(`(${status}) ${message}`);
  }
}
