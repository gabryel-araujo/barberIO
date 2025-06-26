"use client";

import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-5 bg-[#1a1f2c]">
      <p className=" text-center font-bold text-2xl text-white">
        <span className="text-[#3f88c5]">Barber</span>iO
      </p>
      <Sheet>
        <SheetTrigger>
          <AlignJustify color="white" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#1a1f2c] overflow-scroll">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
