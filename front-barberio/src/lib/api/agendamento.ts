import axiosInstance from "../axios";

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
