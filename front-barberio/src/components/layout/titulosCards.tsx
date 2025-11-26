import { Copy } from "lucide-react";
import { Button } from "../ui/button";

type TitulosCardsProps = {
  Titulos: string;
  subtitulo?: string;
  tituloButton?: string;
  onClick?: () => void;
};

export const TitulosCards = ({
  Titulos,
  subtitulo,
  onClick,
  tituloButton,
}: TitulosCardsProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center md:justify-between">
        <p className="text-2xl font-semibold">{Titulos}</p>
        {tituloButton && (
          <Button
            onClick={onClick}
            type="button"
            className="cursor-pointer bg-primary text-sm flex gap-3 items-center"
          >
            <Copy size={20} /> Link de agendamento
          </Button>
        )}
      </div>
      <p className="text-slate-500 text-sm">{subtitulo}</p>
    </div>
  );
};
