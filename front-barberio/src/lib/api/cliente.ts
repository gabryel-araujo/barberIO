import { cache } from "react";
import axiosInstance from "../axios";
import { Cliente } from "@/types/cliente";

export const GETClientes = cache(async (): Promise<Cliente[]> => {
  try {
    const respose = await axiosInstance.get<Cliente[]>("/clientes");
    return respose.data;
  } catch (error) {
    console.error("Erro ao listar clientes", error);
    throw error;
  }
});

export const POSTCliente = async (nome: string, telefone: string) => {
  try {
    const response = await axiosInstance.post("/clientes", {
      nome,
      telefone,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar funcionario", error);
    throw error;
  }
};

export const findByTelefone = async (telefone: string) => {
  const clientes = await GETClientes();

  const filtrado = clientes.filter((cliente) => cliente.telefone === telefone);
  console.log("filtrado", filtrado);

  return filtrado;
};
