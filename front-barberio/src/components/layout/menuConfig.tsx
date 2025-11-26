import {
  LayoutDashboard,
  TrendingUp,
  Settings,
  BarChart3,
  Bell,
  Activity,
  Database,
  LogOut,
  Building,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  {
    title: "Dashboard",
    url: "/administracao",
    icon: LayoutDashboard,
  },
  {
    title: "Empresas",
    url: "/administracao/empresa",
    icon: Building,
  },
  {
    title: "Financeiro",
    url: "/administracao/financeiro",
    icon: TrendingUp,
  },
  {
    title: "Relatórios",
    url: "/administracao/relatorios",
    icon: BarChart3,
  },
  {
    title: "Notificações",
    url: "/administracao/notificacoes",
    icon: Bell,
  },
  {
    title: "Atividades",
    url: "/administracao/atividades",
    icon: Activity,
  },
  {
    title: "Configurações",
    url: "/administracao/config",
    icon: Settings,
  },
  {
    title: "Sistema",
    url: "/administracao/sistema",
    icon: Database,
  },
  {
    title: "Sair",
    url: "/home",
    icon: LogOut,
  },
];

export function MenuConfig() {
  const pathname = usePathname();
  const isPathActive = (href?: string) => {
    return pathname === href;
  };
  return (
    <aside className="z-40 flex h-screen w-20 flex-col items-center gap-8 border-r border-border bg-[#061023] py-6">
      {/* Logo Area */}
      <div className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl  p-1 transition-colors">
        <div className="text-2xl font-bold text-primary transition-transform group-hover:scale-110">
          <img src="/imagens/default.png" alt="" className="rounded-xl" />
        </div>
      </div>

      {/* Menu Items */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-1 flex-col gap-3">
          {menuItems.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.url}
                  className={cn(
                    "relative flex items-center justify-center rounded-lg px-4 py-4 transition-colors",
                    isPathActive(item.url)
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      : "text-muted-foreground hover:bg-primary/40 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 transition-colors" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
