import {
  Calendar,
  Users,
  Scissors,
  BarChart,
  Menu,
  User,
  X,
  Home,
} from "lucide-react";
import { ReactNode } from "react";

type MenuItem = {
  path: string;
  icon: ReactNode;
  label: string;
};

const menuItems: MenuItem[] = [
  {
    path: "/",
    icon: <Home className="h-5 w-5" />,
    label: "Home",
  },
  {
    path: "/dashboard",
    icon: <BarChart className="h-5 w-5" />,
    label: "Dashboard",
  },
  {
    path: "/agendamentos",
    icon: <Calendar className="h-5 w-5" />,
    label: "Agendamentos",
  },
  {
    path: "/clientes",
    icon: <User className="h-5 w-5" />,
    label: "Clientes",
  },
  {
    path: "/barbeiros",
    icon: <Users className="h-5 w-5" />,
    label: "Barbeiros",
  },
  {
    path: "/servicos",
    icon: <Scissors className="h-5 w-5" />,
    label: "Serviços",
  },
];

export default menuItems;
