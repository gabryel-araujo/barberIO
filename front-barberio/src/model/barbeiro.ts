import { Barbeiro } from "@/types/barbeiro";

export const barbeiro: Barbeiro[] = [
  {
    id: "1",
    nome: "André Barber",
    servicos: ["1", "2", "3"],
    isDisponivel: true,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    nome: "Marcos Corte",
    servicos: ["1", "2", "4", "5"],
    isDisponivel: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    nome: "Felipe Navalha",
    servicos: ["1", "3", "4"],
    isDisponivel: false,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
];
