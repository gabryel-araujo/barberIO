import { cache } from "react";
import axiosInstance from "../axios";
import { Barbeiro } from "@/types/barbeiro";
import { LoginType } from "@/types/loginType";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Cookies from "js-cookie";

export const fazerLogin = async (
  email: String,
  password: String
): Promise<LoginType> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email: email,
      senha: password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionarios", error);
    throw error;
  }
};

export const setGoogleFuncionario = async (nome: String, email: String) => {
  try {
    const response = await axiosInstance.post("/admin/funcionarios", {
      nome: nome,
      email: email,
    });
    return response;
  } catch (errorReg) {
    console.error("Erro ao cadastrar funcionario", errorReg);
    throw errorReg;
  }
};

export const GETFuncionarios = cache(async (): Promise<Barbeiro[]> => {
  try {
    const respose = await axiosInstance.get<Barbeiro[]>("/funcionarios", {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    });
    return respose.data;
  } catch (error) {
    console.error("Erro ao listar funcionarios", error);
    throw error;
  }
});

export const POSTFuncionario = async (
  nome: string,
  email: string,
  senha: string,
  data_nascimento: string,
  disponivel: boolean,
  servicos?: string[],
  ativo?: boolean
) => {
  try {
    const response = await axiosInstance.post(
      "/funcionarios",
      {
        nome,
        email,
        senha,
        data_nascimento,
        disponivel,
        newServices: servicos,
        ativo,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar funcionario", error);
    throw error;
  }
};

export const changeStatus = async (
  id: number,
  nome: string,
  email: string,
  senha: string,
  disponivel: boolean,
  ativo: boolean
) => {
  try {
    const response = await axiosInstance.put(
      `/funcionarios/${id}`,
      {
        nome,
        email,
        senha,
        disponivel,
        ativo,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao atualizar", error);
    throw error;
  }
};

export const PUTFuncionario = async (
  id: number,
  nome: string,
  email: string,
  data_nascimento: string,
  disponivel: boolean,
  senha?: string,
  ativo?: boolean
) => {
  try {
    const response = await axiosInstance.put(
      `/funcionarios/${id}`,
      {
        nome,
        email,
        senha,
        data_nascimento,
        disponivel,
        ativo,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar funcionario", error);
    throw error;
  }
};

export const DELETEFuncionario = async (value: Barbeiro) => {
  try {
    const response = await axiosInstance.put(
      `/funcionarios/${value.id}`,
      {
        ...value,
        disponivel: false,
        ativo: false,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const ReativarFuncionario = async (value: Barbeiro) => {
  try {
    const response = await axiosInstance.put(
      `/funcionarios/${value.id}`,
      {
        ...value,
        disponivel: true,
        ativo: true,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addServicoFuncionario = async (
  funcionarioId: number,
  servicoId: number
) => {
  try {
    const response = await axiosInstance.patch(
      `/funcionarios/${funcionarioId}/adicionarServico/${servicoId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeServicoFuncionario = async (
  funcionarioId: number,
  servicoId: number
) => {
  try {
    const response = await axiosInstance.patch(
      `/funcionarios/${funcionarioId}/removerServico/${servicoId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
