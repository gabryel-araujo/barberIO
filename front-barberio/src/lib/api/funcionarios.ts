import { cache } from "react";
import axiosInstance from "../axios";
import { BarbeiroApi } from "@/types/barbeiro";

export const login = async (email: String, password: String) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email: email,
      senha: password,
    });
    //response.data.token
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionarios", error);
    throw error;
  }
};

export const getFuncionarios = cache(async (): Promise<BarbeiroApi[]> => {
  try {
    const respose = await axiosInstance.get<BarbeiroApi[]>("/funcionarios");
    return respose.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionario", error);
    throw error;
  }
});

export const setFuncionario = async (
  nome: string,
  email: string,
  senha: string,
  data_nascimento: string
) => {
  try {
    const response = await axiosInstance.post("/funcionarios", {
      nome,
      email,
      senha,
      data_nascimento,
    });
    return response;
  } catch (errorReg) {
    console.error("Erro ao cadastrar funcionario", errorReg);
    throw errorReg;
  }
};

export const setGoogleFuncionario = async (nome: String, email: String) => {
  try {
    const response = await axiosInstance.post("/funcionarios", {
      nome: nome,
      email: email,
    });
    return response;
  } catch (errorReg) {
    console.error("Erro ao cadastrar funcionario", errorReg);
    throw errorReg;
  }
};
