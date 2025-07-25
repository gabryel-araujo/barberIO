"use client";
import Link from "next/link";
import MenuItems from "./ItemMenu";
import { usePathname } from "next/navigation";

interface SideBarProps {
  onClick?: () => void;
}

export const Sidebar = ({ onClick }: SideBarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-[#1a1f2c] text-white md:w-[300px] min-h-screen">
      <p className="py-8 text-center font-bold text-2xl">
        <span className="text-[#3f88c5]">Barber</span>iO
      </p>
      {MenuItems.map((menu) => (
        <Link
          onClick={onClick}
          className={
            pathname === menu.path
              ? "flex items-center gap-3 bg-[#3f88c5]/40 py-3 px-5 border-l-4 border-[#3f88c5] hover:bg-[#3f88c5]/40"
              : "flex items-center gap-3  py-3 px-5 hover:bg-[#3f88c5]/40"
          }
          key={menu.path}
          href={menu.path}
        >
          {" "}
          {menu.icon}
          {menu.label}
        </Link>
      ))}
    </div>
  );
};
