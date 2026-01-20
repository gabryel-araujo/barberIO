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

export const URLPublicaImg =
  "https://deljowbybxjkqoofsvfk.supabase.co/storage/v1/object/public/barberiO/img";

export function pegarImagem(nome?: string, id?: string) {
  if (!nome || !id) return null;
  return `${URLPublicaImg}/${nome}${id}.png`;
}
export async function checkImagem(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export function maskPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) {
    return numbers;
  }

  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  // FIXO → 10 dígitos
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(
      2,
      6,
    )}-${numbers.slice(6)}`;
  }

  // CELULAR → 11 dígitos
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}
