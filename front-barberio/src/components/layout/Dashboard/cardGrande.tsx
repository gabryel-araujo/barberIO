import { ReactNode } from "react";

type CardGrandeProps = {
  Titulo: string;
  Legenda: string;
  children: ReactNode;
};

export const CardGrande = ({ Titulo, Legenda, children }: CardGrandeProps) => {
  return (
    <div className="bg-slate-100 border rounded-2xl md:p-5 p-2 space-y-3 shadow-md">
      <div>
        <p className="font-semibold text-xl text-slate-700">{Titulo}</p>
        <p className="text-xs text-slate-500">{Legenda}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
