import { z } from "zod";
import { formSchemaHorarioFuncionamento } from "../schemas/schemas";

export const Horarios: z.infer<typeof formSchemaHorarioFuncionamento>[] = [
  {
    id: 1,
    aberto: true,
    nome: "Segunda-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 2,
    aberto: true,
    nome: "Terça-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 3,
    aberto: true,
    nome: "Quarta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 4,
    aberto: true,
    nome: "Quinta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 5,
    aberto: true,
    nome: "Sexta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 6,
    aberto: true,
    nome: "Sábado",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 7,
    aberto: false,
    nome: "Domingo",
    abertura: "08:00",
    fechamento: "18:00",
  },
];
