import { cache } from "react";
import axiosInstance from "../axios";
import { Agendamento } from "@/types/agendamento";
import { AxiosResponse } from "axios";

export const agendar = async (
  barbeiro_id: number,
  cliente_id: number,
  servico_id: number,
  horario: string
) => {
  try {
    const response = axiosInstance.post("/agendamentos", {
      barbeiro: { id: barbeiro_id },
      cliente: { id: cliente_id },
      servico: { id: servico_id },
      horario,
    });
    return response;
  } catch (error) {
    console.error("Erro ao realizar agendamento", error);
    throw error;
  }
};

export const GETAgendamentos = cache(async (): Promise<Agendamento[]> => {
  try {
    const respose = await axiosInstance.get<Agendamento[]>("/agendamentos");
    return respose.data;
  } catch (error) {
    console.error("Erro ao listar agendamentos", error);
    throw error;
  }
});

export const DELETEAgendamento = cache(
  async (id: number): Promise<AxiosResponse<any, any>> => {
    try {
      const respose = await axiosInstance.delete(`/agendamentos/${id}`);
      return respose;
    } catch (error) {
      console.error("Erro ao apagar agendamento", error);
      throw error;
    }
  }
);
