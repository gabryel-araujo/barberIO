"use client";
import { useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { Award, Star } from "lucide-react";
import { inicialData, useForm } from "@/contexts/AgendamentoContextProvider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { GETFuncionarios } from "@/lib/api/funcionarios";
import Image from "next/image";

export const Step2 = () => {
  const { state, dispatch } = useForm();
  const [barbeiro, setbarbeiro] = useState(state.barbeiro);

  const { data: barbeiros = [] } = useQuery({
    queryKey: ["barbeirosDisponivel"],
    queryFn: GETFuncionarios,
    //staleTime: 3000,
  });

  const barbeiroDisponivel = barbeiros.filter((b) => b.disponivel && b.ativo);

  function proximoPasso() {
    if (state.barbeiro.nome === "") {
      toast.warning("Selecione um profissional");
      return;
    }

    if (state.currentStep >= 4) return;
    else {
      //gabryel: retirei o dispatch daqui para sempre que clicar no barbeiro atualizar o resumo
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
      //gabryel: adicionei esse dispatch para caso o usuário volte, o sistema retirar o barbeiro selecionado
      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: inicialData.barbeiro,
      });
    }
  }

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um barbeiro</p>
        <span className="text-xs text-slate-500">
          Selecione o profissional de sua preferência
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-4 w-full justify-items-center items-center">
          {barbeiroDisponivel.map((barber) => (
            <div
              key={barber.id}
              onClick={() => {
                setbarbeiro(barber);
                dispatch({
                  type: AgendamentoAction.setBarbeiro,
                  payload: barber,
                });
              }}
              className={`border-2 w-4/5 py-10 cursor-pointer${
                barber.nome === barbeiro.nome ? "border-2 border-[#3f89c5]" : ""
              } border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-lg p-4 flex gap-4 items-center w-full`}
            >
              {barber.avatar ? (
                <img
                  src={barber.avatar}
                  alt="imagem do barbeiro"
                  className="h-20 w-20 rounded-full border-4 border-[#3f89c5] object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-3xl border border-slate-700">
                  {barber.nome[0]}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold flex gap-3">{barber.nome}</p>
                <section className="flex items-center gap-1">
                  <Star color="orange" fill="orange" />
                  <p className="text-sm text-slate-500">
                    <b>4.3</b> (123+ Avaliações)
                  </p>
                </section>
                <section className="flex items-center gap-1">
                  <Award color="#3f89c5" />
                  <p className="text-sm text-slate-500">
                    <b>Quantidade de cortes:</b> {barber.atendimentos}
                  </p>
                </section>
              </div>
            </div>
          ))}
        </div>
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

          <Button className="cursor-pointer" onClick={proximoPasso}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
