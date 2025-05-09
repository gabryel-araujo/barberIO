"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function LayoutResponsivo({ children }: Props) {
  const isMobile = useIsMobile();
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);
  if (!montado) {
    return null;
  }

  return (
    <div className={`${isMobile ? "flex flex-col" : "flex"} min-h-screen`}>
      {isMobile ? <MobileSidebar /> : <Sidebar />}
      {children}
    </div>
  );
}
