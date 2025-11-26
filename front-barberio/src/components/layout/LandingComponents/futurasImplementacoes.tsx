import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

const implementacoes = [
  {
    card: "BI-0001",
    titulo: "Módulo Financeiro",
    descricao:
      "Controle financeiro avançado por cortes, formas de pagamentos, receitas e despesas, comissão.",
    status: "Em Desenvolvimento",
  },
  {
    card: "BI-0001",
    titulo: "Módulo Financeiro",
    descricao:
      "Controle financeiro avançado por cortes, formas de pagamentos, receitas e despesas, comissão.",
    status: "Em Desenvolvimento",
  },
  {
    card: "BI-0001",
    titulo: "Módulo Financeiro",
    descricao:
      "Controle financeiro avançado por cortes, formas de pagamentos, receitas e despesas, comissão.",
    status: "Em Desenvolvimento",
  },
  {
    card: "BI-0001",
    titulo: "Módulo Financeiro",
    descricao:
      "Controle financeiro avançado por cortes, formas de pagamentos, receitas e despesas, comissão.",
    status: "Em Desenvolvimento",
  },
];

const FuturasImplementacoes = () => {
  return (
    <div
      className="bg-orange-100/40 py-20 border border-t-4 border-orange-600  p-6"
      id="futuro"
    >
      <div>
        <p className="text-4xl flex items-center justify-center font-black gap-3 text-orange-600">
          <span className="bg-orange-300 p-2 rounded-lg">
            {" "}
            <Construction size={25} />
          </span>{" "}
          <span> Funcionalidades em Desenvolvimento</span>
        </p>
        <p className="text-sm pt-3 font-semibold text-muted-foreground text-center">
          Preview das próximas funcionalidades que estarão disponíveis em breve
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 rounded-lg py-6">
        {implementacoes.map((imp) => (
          <Card key={imp.card} className="p-6 border-l-4 border-l-orange-600">
            <div>
              <p className="font-bold text-2xl text-slate-700">{imp.titulo}</p>
              <p className="text-muted-foreground text-sm">{imp.descricao}</p>
            </div>
            <p>
              <Badge className="bg-slate-700">{imp.status}</Badge>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default FuturasImplementacoes;
