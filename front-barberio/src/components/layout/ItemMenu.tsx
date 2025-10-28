import Cookies from "js-cookie";
import {
  Calendar,
  Users,
  Scissors,
  //BarChart,
  User,
  Home,
  Settings,
} from "lucide-react";
import { ReactNode } from "react";

type MenuItem = {
  path: string;
  ref?: string;
  icon: ReactNode;
  label: string;
  permission: string | "";
};

let empresaId;
empresaId = Cookies.get("ref");

const menuItems: MenuItem[] = [
  {
    path: `/home?ref=${empresaId}`,
    ref: "/home",
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    permission: "",
  },
  // {
  //   path: `/dashboard`,
  //   ref: "/dashboard",
  //   icon: <BarChart className="h-5 w-5" />,
  //   label: "Dashboard",
  //   permission: "GESTOR",
  // },
  {
    path: `/agendamentos`,
    ref: "/agendamentos",
    icon: <Calendar className="h-5 w-5" />,
    label: "Agendamentos",
    permission: "GESTOR",
  },
  {
    path: `/clientes`,
    ref: "/clientes",
    icon: <User className="h-5 w-5" />,
    label: "Clientes",
    permission: "GESTOR",
  },
  {
    path: `/barbeiros`,
    ref: "/barbeiros",
    icon: <Users className="h-5 w-5" />,
    label: "Barbeiros",
    permission: "GESTOR",
  },
  {
    path: `/servicos`,
    ref: "/servicos",
    icon: <Scissors className="h-5 w-5" />,
    label: "Serviços",
    permission: "GESTOR",
  },
  {
    path: `/configuracao`,
    ref: "/configuracao",
    icon: <Settings className="h-5 w-5" />,
    label: "Configuração",
    permission: "GESTOR",
  },
];

export default menuItems;
