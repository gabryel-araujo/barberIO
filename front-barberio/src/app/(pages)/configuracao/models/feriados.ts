import { z } from "zod";
import { formSchemaFeriado } from "../schemas/schemas";

export const Feriados: z.infer<typeof formSchemaFeriado>[] = [
  {
    id: 1,
    nome: "Natal",
    data: "25/12/2025",
    recorrente: true,
  },
  {
    id: 2,
    nome: "Ano Novo",
    data: "01/01/2026",
    recorrente: true,
  },
];
