import { Barbeiro } from "@/types/barbeiro";

export const barbeiro: Barbeiro[] = [
  {
    id: "1",
    nome: "André Barber",
    email: "email@email.com",
    senha: "123",
    data_nascimento: "",
    servicos: ["1", "2", "3"],
    isDisponivel: true,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    nome: "Marcos Corte",
    email: "email@email.com",
    senha: "123",
    data_nascimento: "",
    servicos: ["1", "2", "4", "5"],
    isDisponivel: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    nome: "Felipe Navalha",
    email: "email@email.com",
    senha: "123",
    data_nascimento: "",
    servicos: ["1", "3", "4"],
    isDisponivel: false,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
];
