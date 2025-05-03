import { useState } from "react";
import { AgendamentoAction, useForm } from "@/contexts/AgendamentoContext";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export const Step2 = () => {
  const { state, dispatch } = useForm();
  const [hora, setHora] = useState<string | undefined>(state.horario);

  function proximoPasso() {
    if (state.currentStep >= 4) return;
    else {
      dispatch({
        type: AgendamentoAction.setHorario,
        payload: hora,
      });
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
    }
  }
  const horariosDisponiveis = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  return (
    <div className="border rounded-lg mx-50 p-5 shadow ">
      <div>
        <p className="text-2xl font-bold">Escolha um horário</p>
        <span className="text-xs text-slate-500">
          Escolha um horário disponível para o seu atendimento
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center pt-5">
        <div className="grid grid-cols-4 gap-5">
          {horariosDisponiveis.map((horario) => (
            <Button
              key={horario}
              variant={hora === horario ? "default" : "outline"}
              className={
                hora === horario
                  ? "bg-primary hover:bg-barber-accent/90 w-[150px]"
                  : "w-[150px]"
              }
              onClick={() => setHora(horario)}
            >
              <Clock className="mr-2 h-4 w-4" />
              {horario}
            </Button>
          ))}
        </div>

        <div className="flex gap-3 items-center justify-between">
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
