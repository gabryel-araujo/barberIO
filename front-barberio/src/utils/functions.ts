import { format } from "date-fns";
import Cookies from "js-cookie";
import * as jose from "jose";
import { tokenType } from "@/types/tokenType";

export function formatarTelefone(telefone: string): string {
  // Remove tudo que não é número
  if (!telefone) return "";
  const numeros = telefone.replace(/\D/g, "");

  // Aplica o padrão (99) 99999-9999
  return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export function normalizarData(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}

export function dataFormatada(data: Date) {
  const dataNova = format(data, "dd/MM/yyyy");
  return dataNova;
}

export function nomeCapitalizado(nome: string): string {
  return nome
    .toLowerCase()
    .split(" ")
    .filter((palavra) => palavra.trim() !== "")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

export function isTokenValido() {
  const token = Cookies.get("authToken");

  if (!token) {
    return false;
  }

  try {
    const decodificado = jose.decodeJwt(token);

    const exp = decodificado.exp;
    const agora = Math.floor(Date.now() / 1000);

    if (exp && exp < agora) {
      Cookies.remove("authToken");
      return false;
    }

    return true;
  } catch (err) {
    Cookies.remove("authToken");
    return false;
  }
}

export function validarToken() {
  const tokenValido = isTokenValido();

  const token = Cookies.get("authToken");

  if (token && tokenValido) {
    const validado: tokenType = jose.decodeJwt(token);

    return validado;
  }

  return null;
}

export function validarTokenServer(token: string | undefined) {
  if (!token) return null;

  try {
    const decoded = jose.decodeJwt(token);
    return decoded; // deve conter { role: "DEV" | "USER" | ... }
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function getEmpresaIdFromHref(): string {
  return window.location.href.split("=")[1];
}

export const formatCurrency = (value: number | string) => {
  const numero = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
};
