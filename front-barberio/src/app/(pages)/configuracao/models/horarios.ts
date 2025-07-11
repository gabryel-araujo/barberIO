import { z } from "zod";
import { formSchemaHorarioFuncionamento } from "../schemas/schemas";

export const Horarios: z.infer<typeof formSchemaHorarioFuncionamento>[] = [
  {
    id: 1,
    status: true,
    nome: "Segunda-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 2,
    status: true,
    nome: "Terça-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 3,
    status: true,
    nome: "Quarta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 4,
    status: true,
    nome: "Quinta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 5,
    status: true,
    nome: "Sexta-Feira",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 6,
    status: true,
    nome: "Sábado",
    abertura: "08:00",
    fechamento: "18:00",
  },
  {
    id: 2,
    status: true,
    nome: "Domingo",
    abertura: "08:00",
    fechamento: "18:00",
  },
];
