import axiosInstance from "../axios";

export const getFuncionarios = async (email: String, password: String) => {
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

export const setFuncionario = async (
  nome: String,
  email: String,
  senha: String
) => {
  try {
    const response = await axiosInstance.post("/funcionarios", {
      nome: nome,
      email: email,
      senha: senha,
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
