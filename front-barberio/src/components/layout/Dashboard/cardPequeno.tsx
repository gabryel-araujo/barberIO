import { ReactNode } from "react";

type CardPequenoProps = {
  Titulo?: string;
  Quantidade?: number;
  Icon?: ReactNode;
  Legenda?: string;
};

export const CardPequeno = ({
  Titulo,
  Icon,
  Quantidade,
  Legenda,
}: CardPequenoProps) => {
  return (
    <div className="bg-slate-100 md:w-1/3 border rounded-2xl p-5 space-y-3 shadow-md">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-700">{Titulo}</p>
        <p className="text-slate-400">{Icon}</p>
      </div>
      <div className="font-semibold text-slate-700 text-2xl">{Quantidade}</div>
      <div className="text-xs text-slate-600">{Legenda}</div>
    </div>
  );
};
