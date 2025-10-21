"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ptBR } from "date-fns/locale";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "@/contexts/AgendamentoContextProvider";
import { HomeIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { empresaSchema } from "@/app/(pages)/configuracao/schemas/schemas";
import { ErrorResponse } from "@/app/(pages)/configuracao/page";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { getEmpresaIdFromHref } from "@/utils/functions";

export const Step1 = () => {
  const empresaIdRef = useRef<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const { state, dispatch } = useForm();
  const [dadosEmpresa, setDadosEmpresa] =
    useState<z.infer<typeof empresaSchema>>();
  const { push } = useRouter();
  const irHome = () => {
    push(`/home?ref=${empresaIdRef.current}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      empresaIdRef.current = getEmpresaIdFromHref();
    }
  }, []);

  const { data, error } = useQuery<
    z.infer<typeof empresaSchema>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["empresas"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/empresas/${empresaIdRef.current}`
      );
      return response.data;
    },
    staleTime: 5 * (60 * 1000),
  });

  useEffect(() => {
    if (data) {
      setDadosEmpresa(data);
    }
  }, [data]);

  if (error) {
    console.log(error);
    toast.error(error.response!.data!.message || "ops ocorreu um erro!");
  }

  const diasFeriados = dadosEmpresa?.config_empresa?.feriados!;
  const arrayFeriados = (diasFeriados ?? [])
    .map((f) => f.data)
    .filter((d): d is string => Boolean(d));
  const arrayFeriadoData = arrayFeriados.map((data) => {
    const [ano, mes, dia] = data.split("-").map(Number);
    const localDate = new Date(ano, mes - 1, dia + 1);
    return localDate.toISOString().slice(0, 10);
  });
  console.log(arrayFeriados);

  const diasFechados =
    dadosEmpresa?.config_empresa?.horarios
      ?.filter((dia) => dia.aberto === false)
      .map((dia) => dia.codigo_dia) || [];
  console.log("dias fechados: ", diasFechados);

  const isDataInvalida = (date: Date) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dateSemHoras = new Date(date);
    dateSemHoras.setHours(0, 0, 0, 0);

    const isBeforeToday = dateSemHoras < hoje;
    const codigoDia = dateSemHoras.getDay();

    const isCloset = diasFechados.includes(codigoDia);
    const isFeriado =
      arrayFeriadoData.some((feriadoStr) => {
        const feriado = new Date(feriadoStr); // conversão aqui
        return (
          feriado.getFullYear() === date.getFullYear() &&
          feriado.getMonth() === date.getMonth() &&
          feriado.getDate() === date.getDate()
        );
      }) || false;

    return isBeforeToday || isFeriado || isCloset;
  };

  const proximoPasso = useCallback((data: Date) => {
    if (state.currentStep >= 4) return;
    //Invalidando Datas
    if (!data || isDataInvalida(new Date(data))) {
      toast.error("Selecione uma data válida para continuar");
    } else {
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
            if (!dataSelecionada) return;

            setDate(dataSelecionada);
            dispatch({
              type: AgendamentoAction.setData,
              payload: dataSelecionada,
            });
            console.log(dataSelecionada);
          }}
          disabled={(date) => {
            return isDataInvalida(date);
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

          <Button
            className="cursor-pointer"
            onClick={() => proximoPasso(state.data)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
