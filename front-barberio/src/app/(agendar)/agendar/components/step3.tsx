import { useState } from "react";
import { AgendamentoAction, useForm } from "@/contexts/AgendamentoContext";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const Step3 = () => {
  const { state, dispatch } = useForm();
  const [barbeiro, setbarbeiro] = useState(state.barbeiro);

  function proximoPasso() {
    if (state.currentStep >= 4) return;
    else {
      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: barbeiro,
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

  const barbeiroDisponivel = ["Renato Willon", "Gabryel Araújo", "Hugo Rocha"];

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow">
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
              key={barber}
              onClick={() => setbarbeiro(barber)}
              variant={"outline"}
              className={`border-2 md:w-[350px] w-[250px]  py-10 ${
                barber === barbeiro ? "border-2 border-[#3f89c5]" : ""
              }`}
            >
              <p className="text-sm flex gap-3">
                <User className="texto-azul" />
                {barber}
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
