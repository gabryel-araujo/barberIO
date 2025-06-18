import { ReactNode } from "react";

type CardGrandeProps = {
  Titulo: string;
  Legenda: string;
  children: ReactNode;
};

export const CardGrande = ({ Titulo, Legenda, children }: CardGrandeProps) => {
  return (
    <div className="bg-slate-100 md:w-2/4 border rounded-2xl p-5 space-y-3 shadow-md">
      <div>
        <p className="font-semibold text-xl text-slate-700">{Titulo}</p>
        <p className="text-xs text-slate-500">{Legenda}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
