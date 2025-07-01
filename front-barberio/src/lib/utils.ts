import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConversaoData(data: any) {
  const dataAtual = new Date(data);
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // +1 corrige o mês
  const ano = dataAtual.getFullYear();
  return `${dia}-${mes}-${ano}`;
}
export function obterNomeMes(data: Date): string {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return meses[data.getMonth()];
}

export function obterHoras(data: any) {
  const dataAtual = new Date(data);
  const hora = String(dataAtual.getHours()).padStart(2, "0");
  const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
  return `${hora}:${minutos}`;
}
