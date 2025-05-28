import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { changeStatus } from "@/lib/api/funcionarios";
import { Barbeiro } from "@/types/barbeiro";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { useForm as useFormReducer } from "@/contexts/AgendamentoContextProvider";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

type BarberCardProps = {
  barbeiro: Barbeiro;
  form: UseFormReturn<{
    servico: any[] | null;
    nome: string;
    email: string;
    senha: string;
    disponivel: boolean;
    data_nascimento?: string | undefined;
  }>;
  setBarbeiroSelecionado: Dispatch<SetStateAction<Barbeiro | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export function BarberCard({
  barbeiro,
  form,
  setBarbeiroSelecionado,
  setOpenModal,
}: BarberCardProps) {
  const { dispatch } = useFormReducer();

  const handleRecoveryBarbeiro = (barbeiro: Barbeiro) => {
    console.log(barbeiro);
    form.reset({
      nome: barbeiro.nome,
      email: barbeiro.email,
      senha: "",
      data_nascimento: barbeiro.data_nascimento,
      disponivel: barbeiro.disponivel,
      servico: barbeiro.servicos?.map((s) => String(s.id)) || [],
    });
  };

  const updateStatus = async (barbeiro: Barbeiro) => {
    const response = await changeStatus(
      barbeiro.id,
      barbeiro.nome,
      barbeiro.email,
      barbeiro.senha,
      !barbeiro.disponivel
    );

    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 200) {
      toast.success("Barbeiro atualizado com sucesso!");
      console.log(response.data);
    } else if (response.status >= 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.log(response);
      console.error(response.statusText);
    }
  };

  return (
    <Card key={barbeiro.id}>
      <div className="rounded-t-md p-3 bg-slate-800 flex justify-start items-center gap-3">
        <div className="border rounded-full h-14 min-w-14 bg-slate-700 items-center justify-center flex text-white">
          <p className="font-bold text-3xl">{barbeiro.nome.split("")[0]}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-bold text-slate-100">{barbeiro.nome}</p>
            <p
              className={`font-semibold
                        ${
                          barbeiro.disponivel
                            ? "text-green-300"
                            : "text-red-400"
                        }`}
            >
              {barbeiro.disponivel ? "Disponível" : "Indisponível"}
            </p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-amber-300 font-bold">{barbeiro.avaliacao}</p>
            <Star fill="yellow" color="#ffd230" />
          </div>
        </div>
      </div>

      <div className="px-3">
        <p className="text-sm font-semibold">Serviços:</p>
        <span className="">
          {barbeiro.servicos?.map((servico) => {
            return (
              <span
                key={servico.id}
                className="ml-3 bg-slate-100 rounded-sm text-slate-800 text-xs px-2 py-0.5"
              >
                {servico.nome}
              </span>
            );
          })}
        </span>
      </div>
      <div className="w-full px-3 py-3 flex justify-between items-center">
        <Button
          onClick={() => {
            handleRecoveryBarbeiro(barbeiro);
            setBarbeiroSelecionado(barbeiro);
            setOpenModal(true);
          }}
          className="bg-slate-700 hover:bg-slate-600"
        >
          Gerenciar
        </Button>
        <div className="flex gap-3">
          <Switch
            id="disponivel"
            checked={barbeiro.disponivel}
            onCheckedChange={() => {
              updateStatus(barbeiro);
            }}
          />
          <Label htmlFor="disponivel" className="font-normal">
            {barbeiro.disponivel ? "Disponível" : "Indisponível"}
          </Label>
        </div>
      </div>
    </Card>
  );
}
