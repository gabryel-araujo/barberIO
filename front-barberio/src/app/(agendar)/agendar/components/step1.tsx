import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";

export const Step1 = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="border rounded-lg mx-50 p-5 shadow">
      <div>
        <p className="text-2xl font-bold">Selecione uma data</p>
        <span className="text-xs text-slate-500">
          selecione uma data disponível no calendário
        </span>
      </div>
      <div className="flex items-center justify-center">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-[250px] rounded-md border shadow"
        />
      </div>
    </div>
  );
};
