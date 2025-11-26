import Cookies from "js-cookie";
import { Calendar, Users, Scissors, User, Home, Settings } from "lucide-react";
import { ReactNode, useMemo } from "react";

export type MenuItem = {
  path: string;
  ref?: string;
  icon: ReactNode;
  label: string;
  permission: ("GESTOR" | "BARBERO" | "DEV" | "")[];
};

export function useMenuItems() {
  const empresaId = Cookies.get("ref") || ""; // lê direto do cookie

  return useMemo(
    () => [
      {
        path: `/home?ref=${empresaId}`,
        ref: "/home",
        icon: <Home className="h-5 w-5" />,
        label: "Home",
        permission: "",
      },
      {
        path: `/agendamentos`,
        ref: "/agendamentos",
        icon: <Calendar className="h-5 w-5" />,
        label: "Agendamentos",
        permission: ["GESTOR", "DEV"],
      },
      {
        path: `/clientes`,
        ref: "/clientes",
        icon: <User className="h-5 w-5" />,
        label: "Clientes",
        permission: ["GESTOR", "DEV"],
      },
      {
        path: `/barbeiros`,
        ref: "/barbeiros",
        icon: <Users className="h-5 w-5" />,
        label: "Barbeiros",
        permission: ["GESTOR", "DEV"],
      },
      {
        path: `/servicos`,
        ref: "/servicos",
        icon: <Scissors className="h-5 w-5" />,
        label: "Serviços",
        permission: ["GESTOR", "DEV"],
      },
      {
        path: `/configuracao`,
        ref: "/configuracao",
        icon: <Settings className="h-5 w-5" />,
        label: "Configuração",
        permission: ["GESTOR", "DEV"],
      },
    ],
    [empresaId]
  );
}
