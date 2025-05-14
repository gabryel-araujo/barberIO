import { useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useForm } from "@/contexts/AgendamentoContextProvider";

export const Step2 = () => {
  const { state, dispatch } = useForm();
  const [hora, setHora] = useState<string | undefined>(state.horario);

  function proximoPasso() {
    if (state.currentStep >= 4) return;
    else {
      //gabryel: retirei o dispatch daqui para modificar o estado do componente assim que clicar na hora
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
      //gabryel: adicionei esse dispatch para caso o usuário volte, o sistema retirar o horario selecionado
      dispatch({
        type: AgendamentoAction.setHorario,
        payload: "",
      });
    }
  }
  const horariosDisponiveis = [
    //todo: trazer isso da API, pois se a barbearia precisar mudar de horário ela vai poder
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
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um horário</p>
        <span className="text-xs text-slate-500">
          Escolha um horário disponível para o seu atendimento
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center pt-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {horariosDisponiveis.map((horario) => (
            <Button
              key={horario}
              variant={hora === horario ? "default" : "outline"}
              className={
                hora === horario
                  ? "bg-primary hover:bg-barber-accent/90 w-[150px]"
                  : "w-[150px] cursor-pointer"
              }
              onClick={() => {
                setHora(horario);
                dispatch({
                  type: AgendamentoAction.setHorario,
                  payload: horario,
                });
              }}
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
