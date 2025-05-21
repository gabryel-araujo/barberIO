import { useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { inicialData, useForm } from "@/contexts/AgendamentoContextProvider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { GETFuncionarios } from "@/lib/api/funcionarios";

export const Step3 = () => {
  const { state, dispatch } = useForm();
  const [barbeiro, setbarbeiro] = useState(state.barbeiro);

  const { data: barbeiros = [] } = useQuery({
    queryKey: ["barbeirosDisponivel"],
    queryFn: GETFuncionarios,
    //staleTime: 3000,
  });

  const barbeiroDisponivel = barbeiros.filter((b) => b.disponivel);

  function proximoPasso() {
    if (state.barbeiro.nome === "") {
      toast.warning("Selecione um profissional");
      return;
    }

    if (state.currentStep >= 4) return;
    else {
      //gabryel: retirei o dispatch daqui para sempre que clicar no barbeiro atualizar o resumo
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep + 1,
      });
    }
  }
  function anteriorPasso() {
    if (state.currentStep <= 1) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep - 1,
      });
      //gabryel: adicionei esse dispatch para caso o usuário volte, o sistema retirar o barbeiro selecionado
      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: inicialData.barbeiro,
      });
    }
  }

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um barbeiro</p>
        <span className="text-xs text-slate-500">
          Selecione o profissional de sua preferência
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {barbeiroDisponivel.map((barber) => (
            <Button
              key={barber.id}
              onClick={() => {
                setbarbeiro(barber);
                dispatch({
                  type: AgendamentoAction.setBarbeiro,
                  payload: barber,
                });
              }}
              variant={"outline"}
              className={`border-2 md:w-[350px] w-[250px]  py-10 cursor-pointer${
                barber.nome === barbeiro.nome ? "border-2 border-[#3f89c5]" : ""
              }`}
            >
              <p className="text-sm flex gap-3">
                <User className="texto-azul" />
                {barber.nome}
              </p>
            </Button>
          ))}
        </div>
        <div className="flex gap-3">
          {state.currentStep != 1 && (
            <Button
              variant="ghost"
              className="cursor-pointer hover:bg-slate-200"
              onClick={anteriorPasso}
            >
              Anterior
            </Button>
          )}

          <Button className="cursor-pointer" onClick={proximoPasso}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
