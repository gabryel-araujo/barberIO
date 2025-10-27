"use client";

import { Button } from "@/components/ui/button";
import { whatsapp } from "@/lib/whstsapp";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[#1a1f2c] backdrop-blur-lg border-b border-border z-50 ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer">
            <img
              src={"/vibrante.png"}
              alt="BarberiO"
              className="h-8"
              onClick={() => {
                router.push("#home");
              }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 ">
            <a
              href="#recursos"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Recursos
            </a>
            <a
              href="#como-funciona"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Como funciona
            </a>
            <a
              href="#depoimentos"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Depoimentos
            </a>
            <a
              href="#precos"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Preços
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => {
                router.push("/login");
              }}
            >
              Entrar
            </Button>
            <Button
              variant="default"
              className="bg-linear-to-r from-[#575BEA] via-[#3184E7] to-[#08B0E5] hover:opacity-80"
              onClick={() => {
                router.push(`${whatsapp}83987482651`);
              }}
            >
              Começar
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
