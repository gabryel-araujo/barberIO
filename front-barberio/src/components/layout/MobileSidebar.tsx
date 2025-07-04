"use client";

import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(!open);
  }

  return (
    <div className="flex items-center justify-between px-5 py-5 bg-[#1a1f2c]">
      <p className=" text-center font-bold text-2xl text-white">
        <span className="text-[#3f88c5]">Barber</span>iO
      </p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <AlignJustify color="white" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#1a1f2c] overflow-scroll">
          <Sidebar onClick={closeModal} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
