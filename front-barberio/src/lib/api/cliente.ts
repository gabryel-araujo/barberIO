import { cache } from "react";
import axiosInstance from "../axios";
import { Cliente } from "@/types/cliente";

export const GETClientes = cache(
  async (empresaId: string): Promise<Cliente[]> => {
    try {
      const respose = await axiosInstance.get<Cliente[]>(
        `/public/clientes/${empresaId}`
      );
      return respose.data;
    } catch (error) {
      console.error("Erro ao listar clientes", error);
      throw error;
    }
  }
);

export const POSTCliente = async (
  nome: string,
  telefone: string,
  empresa_id: number
) => {
  try {
    const response = await axiosInstance.post("/public/clientes", {
      nome,
      telefone,
      empresa_id,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionario", error);
    return error;
  }
};

export const findByTelefone = async (telefone: string, empresaId: string) => {
  const clientes = await GETClientes(empresaId);

  const filtrado = clientes.filter((cliente) => cliente.telefone === telefone);
  console.log("filtrado", filtrado);

  return filtrado;
};
