import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { AgendamentoAction, useForm } from "@/contexts/AgendamentoContext";
import { Button } from "@/components/ui/button";

export const Step4 = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { state, dispatch } = useForm();

  function proximoPasso() {
    if (state.currentStep >= 4) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep + 1,
      });
      console.log(state.currentStep);
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
        Step 4
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
