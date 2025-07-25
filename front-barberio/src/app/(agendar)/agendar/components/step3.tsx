"use client";
import { useEffect, useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { CalendarX2, Clock } from "lucide-react";
import { useForm } from "@/contexts/AgendamentoContextProvider";
import { toast } from "sonner";
import { GETHorarios } from "@/lib/api/agendamento";
import { format } from "date-fns";

export const Step3 = () => {
  const { state, dispatch } = useForm();
  const [hora, setHora] = useState<string | undefined>(state.horario);
  const [disponiveis, setDisponiveis] = useState([]);

  function proximoPasso() {
    if (state.horario === "") {
      toast.warning("Selecione um horário");
      return;
    }
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

  async function getHorarios() {
    const response = await GETHorarios(
      state.barbeiro.id,
      format(state.data, "yyyy-MM-dd")
    );
    setDisponiveis(response.data);
    return response.data;
  }

  useEffect(() => {
    getHorarios();
  }, []);

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um horário</p>
        <span className="text-xs text-slate-500">
          Escolha um horário disponível para o seu atendimento
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center pt-5">
        {disponiveis.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {disponiveis.map((horario: string) => {
              const horarioFormatado = horario.slice(0, 5); // "09:00"

              return (
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
                  {horarioFormatado}
                </Button>
              );
            })}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-8">
              <CalendarX2 size={50} className="text-slate-300" />
              <h1 className="font-semibold text-slate-300 text-sm md:text-md text-center">
                Nenhum horário disponível para esse barbeiro nessa data
              </h1>
            </div>
          </>
        )}

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
