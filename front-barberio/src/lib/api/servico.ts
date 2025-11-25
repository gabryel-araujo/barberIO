import { Servico } from "@/types/servico";
import { cache } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const GETServicos = cache(async (): Promise<Servico[]> => {
  try {
    const response = await axios.get(`${baseUrl}/servico`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar servicos", error);
    throw error;
  }
});
