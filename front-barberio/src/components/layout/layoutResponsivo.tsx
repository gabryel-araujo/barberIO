"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 👈 importa o hook
import { MenuConfig } from "./menuConfig";

interface Props {
  children: React.ReactNode;
}

export function LayoutResponsivo({ children }: Props) {
  const isMobile = useIsMobile();
  const [montado, setMontado] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMontado(true);
  }, []);

  if (!montado) return null;

  // 👇 aqui você verifica se está na rota "/"
  const isHomePage = pathname === "/";
  const isAdmin =
    pathname === "/administracao" || pathname.startsWith("/administracao/");

  return (
    <div
      className={`${isMobile ? "flex flex-col" : "flex"} min-h-screen ${
        !isHomePage && !isMobile ? "pl-[300px]" : ""
      }`}
    >
      {!isHomePage &&
        !isAdmin && // 👈 só mostra sidebar se não estiver na home
        (isMobile ? <MobileSidebar /> : <Sidebar />)}
      {isAdmin && <MenuConfig />}
      {children}
    </div>
  );
}
