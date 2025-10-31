"use client";

import { TitulosPages } from "@/components/layout/titulosPages";

const empresa = () => {
  return (
    <div className="space-y-6 p-6">
      {/* titulo e botão */}
      <TitulosPages
        Titulos="Gerenciamento de Empresas"
        subtitulo="Gerenciamento de todas as empresas do BarberIo"
      />
    </div>
  );
};
export default empresa;
