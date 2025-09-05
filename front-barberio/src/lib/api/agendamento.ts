import { cache } from "react";
import axiosInstance from "../axios";
import { AgendamentoPublic } from "@/types/agendamento";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const agendar = async (
  barbeiro_id: number,
  cliente_id: number,
  servico_id: number,
  horario: string,
  fim: string
) => {
  try {
    const response = axiosInstance.post("/public/agendamentos", {
      barbeiro: { id: barbeiro_id },
      cliente: { id: cliente_id },
      servico: { id: servico_id },
      horario,
      fim,
    });
    return response;
  } catch (error) {
    console.error("Erro ao realizar agendamento", error);
    throw error;
  }
};

export const GETAgendamentos = cache(async (): Promise<AgendamentoPublic[]> => {
  try {
    const respose = await axiosInstance.get<AgendamentoPublic[]>(
      "/agendamentos"
    );
    return respose.data;
  } catch (error) {
    console.error("Erro ao listar agendamentos", error);
    throw error;
  }
});

export const DELETEAgendamento = cache(
  async (id: number): Promise<AxiosResponse<any, any>> => {
    try {
      const respose = await axiosInstance.delete(`/admin/agendamentos/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return respose;
    } catch (error) {
      console.error("Erro ao apagar agendamento", error);
      throw error;
    }
  }
);

export const GETHorarios = cache(async (id_barbeiro: number, data: string) => {
  try {
    const respose = await axiosInstance.get(
      `/public/agendamentos/horarios/${id_barbeiro}?data=${data}&empresa_id=1`
    );
    return respose;
  } catch (error) {
    console.error("Erro ao listar horarios", error);
    throw error;
  }
});
