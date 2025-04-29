"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const agendar = () => {
  const [passo, setPasso] = useState(1);

  function proximoPasso() {
    if (passo === 4) {
      return;
    } else {
      setPasso(passo + 1);
    }
  }
  function anteriorPasso() {
    if (passo === 1) {
      return;
    } else {
      setPasso(passo - 1);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <p className="text-3xl font-bold">
        Agende seu <span className="texto-azul">horário</span>
      </p>
      <div className="bg-slate-200 rounded-full flex gap-3 px-3 py-2">
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${passo === 1 ? "bg-azul text-white" : ""}
            ${passo > 1 ? "bg-azul-50 text-white" : ""}
            ${passo < 1 ? "bg-white text-black" : ""}
            `}
        >
          1
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${passo === 2 ? "bg-azul text-white" : ""}
            ${passo > 2 ? "bg-azul-50 text-white" : ""}
            ${passo < 2 ? "bg-white text-black" : ""}
            `}
        >
          2
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${passo === 3 ? "bg-azul text-white" : ""}
            ${passo > 3 ? "bg-azul-50 text-white" : ""}
            ${passo < 3 ? "bg-white text-black" : ""}
            `}
        >
          3
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${passo === 4 ? "bg-azul text-white" : ""}
            ${passo > 4 ? "bg-azul-50 text-white" : ""}
            ${passo < 4 ? "bg-white text-black" : ""}
            `}
        >
          4
        </div>
      </div>
      <div>
        {passo == 1 && "passo 1"}
        {passo == 2 && "passo 2"}
        {passo == 3 && "passo 3"}
        {passo == 4 && "passo 4"}
      </div>
      <div className="flex gap-3">
        {passo != 1 && (
          <Button
            variant="ghost"
            className="cursor-pointer hover:bg-slate-200"
            onClick={anteriorPasso}
          >
            Antes
          </Button>
        )}

        <Button className="cursor-pointer" onClick={proximoPasso}>
          Proximo
        </Button>
      </div>
    </div>
  );
};
export default agendar;
