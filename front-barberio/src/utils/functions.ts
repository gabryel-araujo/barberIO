import { format } from "date-fns";

export function formatarTelefone(telefone: string): string {
  // Remove tudo que não é número
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
