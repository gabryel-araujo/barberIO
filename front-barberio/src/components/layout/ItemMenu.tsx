import {
  Calendar,
  Users,
  Scissors,
  BarChart,
  User,
  Home,
  Settings,
} from "lucide-react";
import { ReactNode } from "react";

type MenuItem = {
  path: string;
  icon: ReactNode;
  label: string;
  permission: string | "";
};

const menuItems: MenuItem[] = [
  {
    path: "/",
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    permission: "",
  },
  {
    path: "/dashboard",
    icon: <BarChart className="h-5 w-5" />,
    label: "Dashboard",
    permission: "ROLE_GESTOR",
  },
  {
    path: "/agendamentos",
    icon: <Calendar className="h-5 w-5" />,
    label: "Agendamentos",
    permission: "ROLE_GESTOR",
  },
  {
    path: "/clientes",
    icon: <User className="h-5 w-5" />,
    label: "Clientes",
    permission: "ROLE_GESTOR",
  },
  {
    path: "/barbeiros",
    icon: <Users className="h-5 w-5" />,
    label: "Barbeiros",
    permission: "ROLE_GESTOR",
  },
  {
    path: "/servicos",
    icon: <Scissors className="h-5 w-5" />,
    label: "Serviços",
    permission: "ROLE_GESTOR",
  },
  {
    path: "/configuracao?empresaId=1",
    icon: <Settings className="h-5 w-5" />,
    label: "Configuração",
    permission: "ROLE_GESTOR",
  },
];

export default menuItems;
