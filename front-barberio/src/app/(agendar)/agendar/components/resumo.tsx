import { useForm } from "@/contexts/AgendamentoContext";
import { Calendar, Clock, Scissors, User } from "lucide-react";

export const ResumoAgendamento = () => {
  const { state } = useForm();

  return (
    <div className="border rounded-lg mx-50 p-5 shadow ">
      <p className="text-sm font-bold">Resumo Agendamento</p>
      <div className="grid grid-cols-2 gap-3 pt-3">
        {state.data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
        }) !== "" ? (
          <div className="flex gap-3">
            <Calendar className="texto-azul" />
            {state.data.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
            })}
          </div>
        ) : (
          ""
        )}
        <div>
          {state.barbeiro !== "" ? (
            <div className="flex gap-3">
              <User className="texto-azul" />
              {state.barbeiro}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {state.horario !== "" ? (
            <div className="flex gap-3">
              <Clock className="texto-azul" />
              {state.horario}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {state.servico !== "" ? (
            <div className="flex gap-3">
              <Scissors className="texto-azul" />
              {state.servico}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
