import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Scissors, Sparkles } from "lucide-react";

interface CardServicoProps {
  nome: string;
  descricao: string;
  duracao: number;
  valor: number;
  selecionado: boolean;
  onClick: () => void;
}

export const CardServico = ({
  nome,
  descricao,
  duracao,
  valor,
  selecionado,
  onClick,
}: CardServicoProps) => {
  return (
    <Card
      className={`p-6 ${selecionado && "border-3 border-primary"}`}
      onClick={onClick}
    >
      <div className="flex justify-end">
        {selecionado === true ? (
          <Badge>
            <Sparkles /> Selecionado
          </Badge>
        ) : (
          ""
        )}
      </div>
      <div
        className={`flex text-xl font-bold items-center justify-between px-3`}
      >
        <p className="text-2xl flex gap-3 items-center justify-center">
          <span className="bg-primary/30 p-2 rounded-lg">
            <Scissors className="text-primary" />
          </span>
          {nome}
        </p>
      </div>
      <p className="text-lg text-muted-foreground px-3 border-b pb-4">
        {descricao}
      </p>
      <div className="flex items-center justify-between px-3">
        <p className="flex gap-3 items-center justify-center">
          <Clock className="text-primary" />
          {duracao}min
        </p>
        <div className="text-3xl text-primary font-bold">
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </Card>
  );
};
