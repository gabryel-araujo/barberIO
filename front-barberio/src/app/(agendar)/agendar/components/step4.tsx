import { useState } from "react";

import { AgendamentoAction, useForm } from "@/contexts/AgendamentoContext";
import { Button } from "@/components/ui/button";
import { servicos } from "@/model/servico";
import { Servico } from "@/types/servico";
import { Divide, Scissors } from "lucide-react";

export const Step4 = () => {
  const { state, dispatch } = useForm();
  //const [servico, setServico] = useState<Servico | any>(state.servico);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico>(
    state.servico
  );
  const [openModal, setOpenModal] = useState(false);

  function proximoPasso() {
    if (state.currentStep >= 5) return;
    else {
      dispatch({
        type: AgendamentoAction.setServico,
        payload: servicoSelecionado,
      });
      setOpenModal(!openModal);
    }
  }
  function anteriorPasso() {
    if (state.currentStep <= 1) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep - 1,
      });
      console.log(state.currentStep);
    }
  }

  return (
    <div className="border rounded-lg mx-50 p-5 shadow">
      <div>
        <p className="text-2xl font-bold">Escolha um serviço</p>
        <span className="text-xs text-slate-500">
          Escolha o serviço desejado
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-1 gap-3 pt-5">
          {servicos.map((servico) => (
            <Button
              key={servico.id}
              variant="ghost"
              onClick={() => setServicoSelecionado(servico)}
              className={`h-auto w-[650px] flex flex-col border-2 items-start p-4 justify-start text-left ${
                servicoSelecionado?.nome == servico.nome
                  ? "border-2 border-[#3f89c5]"
                  : ""
              }`}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-3 items-center justify-center">
                  <Scissors />
                  {servico.nome}
                </div>
                <div>R$ {servico.valor.toFixed(2)}</div>
              </div>
              <div className="flex justify-between w-full mt-1">
                <div className="text-slate-500">{servico.descricao}</div>
                <div className="text-slate-500">{servico.duracao}min</div>
              </div>
            </Button>
          ))}
        </div>
        {openModal && <div>Modal Aberto</div>}
        <div className="flex gap-3">
          {state.currentStep != 1 && (
            <Button
              variant="ghost"
              className="cursor-pointer hover:bg-slate-200"
              onClick={anteriorPasso}
            >
              Antes
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
