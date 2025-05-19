import { Servico } from "@/types/servico";

export const servicos: Servico[] = [
  {
    id: "1",
    nome: "Corte Simples",
    descricao: "Corte de cabelo masculino básico",
    duracao: 30,
    preco: 35.0,
  },
  {
    id: "2",
    nome: "Barba",
    descricao: "Aparo e modelagem de barba",
    duracao: 20,
    preco: 25.0,
  },
  {
    id: "3",
    nome: "Corte + Barba",
    descricao: "Combo de corte de cabelo e barba",
    duracao: 45,
    preco: 55.0,
  },
  {
    id: "4",
    nome: "Fade",
    descricao: "Corte com técnica fade",
    duracao: 40,
    preco: 45.0,
  },
  {
    id: "5",
    nome: "Hidratação",
    descricao: "Tratamento de hidratação para cabelo ou barba",
    duracao: 30,
    preco: 40.0,
  },
];
