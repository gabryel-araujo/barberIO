"use client";
import Link from "next/link";
import MenuItems from "./ItemMenu";
import { usePathname, useRouter } from "next/navigation";
import InstallButton from "../../../components/InstallButton";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, LogIn } from "lucide-react";
import { validarToken } from "@/utils/functions";
import { tokenType } from "@/types/tokenType";
import Cookies from "js-cookie";

interface SideBarProps {
  onClick?: () => void;
}

export const Sidebar = ({ onClick }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<tokenType | null>(null);

  // Lida com login/logout
  const handleAuthClick = () => {
    setShowDropdown(false);

    if (isLoggedIn) {
      Cookies.remove("authToken");
      setUser(null);
      setIsLoggedIn(false);
    } else {
      router.replace("/login");
    }
  };

  // Alterna menu dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Efeito para validar token e fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const tokenValido = validarToken();
    if (tokenValido) {
      setUser(tokenValido);
      setIsLoggedIn(true);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#1a1f2c] text-white md:w-[300px] min-h-screen justify-between">
      <div>
        <p className="py-8 text-center font-bold text-2xl">
          <span className="text-[#3f88c5]">Barber</span>iO
        </p>

        {MenuItems.map((menu) => {
          // Exibe item se permission === "" (público) ou se bate com role do usuário
          const podeExibir =
            menu.permission === "" || user?.role === menu.permission;

          if (!podeExibir) return null;

          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              onClick={onClick}
              className={`flex items-center gap-3 py-3 px-5 transition-colors ${
                isActive
                  ? "bg-[#3f88c5]/40 border-l-4 border-[#3f88c5]"
                  : "hover:bg-[#3f88c5]/40"
              }`}
            >
              {menu.icon}
              {menu.label}
            </Link>
          );
        })}

        <InstallButton />
      </div>

      {/* Botão de login/logout */}
      <div className="p-2 border-t border-b border-gray-700">
        {isLoggedIn && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-end gap-3 w-full py-2 px-3 hover:bg-[#3f88c5]/40 rounded-md transition-colors cursor-pointer"
            >
              <User size={20} className="text-[#3f88c5]" />
              <span className="truncate">{user.nome}</span>
            </button>

            {showDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#2a2f3c] rounded-md shadow-lg border border-gray-600 z-50">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center gap-3 w-full py-3 px-4 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleAuthClick}
            className="flex items-center gap-3 w-full py-2 px-3 hover:bg-[#3f88c5]/40 rounded-md transition-colors"
          >
            <LogIn size={20} className="text-[#3f88c5]" />
            <span>Fazer Login</span>
          </button>
        )}
      </div>
    </div>
  );
};
