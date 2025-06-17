import { Calendar } from "@/components/ui/calendar";
import { useCallback, useState } from "react";
import { ptBR } from "date-fns/locale";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "@/contexts/AgendamentoContextProvider";
import { HomeIcon } from "lucide-react";
import { toast } from "sonner";

export const Step1 = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { state, dispatch } = useForm();

  const { push } = useRouter();

  const irHome = () => {
    push("/");
  };

  const proximoPasso = useCallback(() => {
    if (state.currentStep >= 4) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep + 1,
      });
    }
  }, []);

  const anteriorPasso = useCallback(() => {
    if (state.currentStep <= 1) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep - 1,
      });
    }
  }, []);

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Selecione uma data</p>
        <span className="text-xs text-slate-500">
          selecione uma data disponível no calendário
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={(dataSelecionada) => {
            if (!dataSelecionada) {
              return toast.warning("Não pode desmarcar a data!");
            }

            setDate(dataSelecionada);
            dispatch({
              type: AgendamentoAction.setData,
              payload: dataSelecionada,
            });
            console.log(dataSelecionada);
          }}
          disabled={(date) => {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const isBeforeToday = date < hoje;
            const isSunday = date.getDay() === 0;

            return isBeforeToday || isSunday;
          }}
          className="w-[250px] rounded-md border shadow"
        />
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
          <Button
            className="cursor-pointer bg-green-600 hover:bg-green-500"
            onClick={irHome}
          >
            <HomeIcon />
            Página Inicial
          </Button>

          <Button className="cursor-pointer" onClick={proximoPasso}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
