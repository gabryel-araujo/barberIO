import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/utils/functions";

interface CardServicoProps {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  fnSelecionaServico?: (checked: boolean) => void;
  checked: boolean;
}

export const CardServico = ({
  id,
  fnSelecionaServico,
  nome,
  descricao,
  duracao,
  preco,
  checked,
}: CardServicoProps) => {
  return (
    <div
      className={`p-4 flex gap-3 border-2 rounded-lg cursor-pointer hover:border-2 hover:border-primary ${
        checked === true ? "border-2 border-primary" : ""
      }`}
      onClick={() => fnSelecionaServico?.(!checked)}
    >
      <div>
        <Checkbox
          id={String(id)}
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => fnSelecionaServico?.(!checked)}
        />
      </div>
      <div>
        <p className="font-semibold">{nome}</p>
        <p className="text-sm text-muted-foreground">{descricao}</p>
        <p className="text-sm text-muted-foreground font-semibold">
          {formatCurrency(preco)} - {duracao} min
        </p>
      </div>
    </div>
  );
};
