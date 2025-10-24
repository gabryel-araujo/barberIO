"use client";
import { useEffect, useRef, useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { Servico } from "@/types/servico";
import { Calendar, Clock, Scissors, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Modal } from "@/components/layout/Modal";
import { DadosCliente, FormData, schema } from "./dadosCliente";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useFormZod } from "react-hook-form";
import { useForm } from "@/contexts/AgendamentoContextProvider";
import { AxiosError } from "axios";
import { agendar } from "@/lib/api/agendamento";
import { findByTelefone, POSTCliente } from "@/lib/api/cliente";
import { LoadingComponent } from "../../../../../components/LoadingComponent";
import { format } from "date-fns";
import { getEmpresaIdFromHref, nomeCapitalizado } from "@/utils/functions";
import Cookies from "js-cookie";
import { Cliente } from "@/types/cliente";

export const Step4 = () => {
  const empresaId = useRef<any>(null);
  const clienteRef = useRef<any>(null);
  const { state, dispatch } = useForm();

  const [servicoSelecionado, setServicoSelecionado] = useState<Servico>(
    state.servico
  );
  const [openModal, setOpenModal] = useState(false);
  const [openModalRevisao, setOpenModalRevisao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      empresaId.current = getEmpresaIdFromHref();
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormZod<FormData>({ resolver: zodResolver(schema) });

  const urlApi = "/api/send-email";

  // const queryClient = useQueryClient();

  const review = [
    {
      icon: <Calendar className="texto-azul" />,
      value: state.data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
      }),
    },
    {
      icon: <User className="texto-azul" />,
      value: state.barbeiro.nome,
    },
    ,
    {
      icon: <Clock className="texto-azul" />,
      value: state.horario,
    },
    ,
    {
      icon: <Scissors className="texto-azul" />,
      value: state.servico.nome,
    },
  ];

  function proximoPasso() {
    //gabryel: removi o dispatch daqui para assim que clicar já atualizar o estado no componente
    if (state.servico.id === 0) {
      toast.warning("Selecione um serviço");
      return;
    }
    if (state.currentStep == 4) {
      setOpenModal(!openModal);
    }
  }
  function anteriorPasso() {
    if (state.currentStep <= 1) return;
    else {
      dispatch({
        type: AgendamentoAction.setcurrentStep,
        payload: state.currentStep - 1,
      });
      dispatch({
        type: AgendamentoAction.setServico,
        payload: {
          duracao: 0,
          id: 0,
          nome: "",
          valor: 0,
          descricao: "",
        } as unknown as Servico,
      });
    }
  }

  const finalizarAgendamento = async (data: FormData) => {
    dispatch({
      type: AgendamentoAction.setNome,
      payload: data.name,
    });
    dispatch({
      type: AgendamentoAction.setTelefone,
      payload: data.phone,
    });

    const response: Cliente[] = await findByTelefone(
      data.phone,
      empresaId.current
    );

    if (response.length == 0) {
      const novo = await POSTCliente(
        nomeCapitalizado(data.name),
        data.phone,
        Number(empresaId.current)
      );
      clienteRef.current = novo;
    } else {
      clienteRef.current = response[0];
    }

    setOpenModal(!openModal);
    setOpenModalRevisao(!openModalRevisao);
  };

  async function handleSendEmail() {
    try {
      await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
    } catch (error) {
      toast.error("Erro ao enviar o email");
    }
  }

  const confirmarAgendamento = async () => {
    try {
      const data = format(state.data, "yyyy-MM-dd'T'");
      const horario = data + state.horario;
      const fim = horario;

      const response = await agendar(
        state.barbeiro.id,
        clienteRef.current.id as number,
        state.servico.id as number,
        horario,
        fim,
        Number(empresaId.current)
      );

      Cookies.set("telefoneCliente", state.telefone);

      setIsLoading(true);
      handleSendEmail();

      if (response.status === 201) {
        toast.success("Agendamento realizado com sucesso!");
        //IMPLEMENTAÇÃO WHATSAPP PARA ENVIO APÓS O AGENDAMENTO
        // axios.post(`${baseCrm}/api/sendText`, {
        //   chatId: `5583${state.telefone.slice(3)}@c.us`,
        //   text: `✅ *AGENDAMENTO CONFIRMADO!*\n\n🎯 *${
        //     state.nome
        //   }*, está tudo certo!\n\n📅 *Data:* ${dataFormatada(
        //     state.data
        //   )}\n⏰ *Horário:* ${state.horario}\n✂️ *Barbeiro:* ${
        //     state.barbeiro.nome
        //   }\n\nPreparamos tudo para deixar seu visual impecável! 🔥\n\nPrecisa reagendar? É só chamar aqui mesmo! 📲\n\n*BarberIO* — *Onde o estilo encontra a perfeição* ✨`,
        //   session: "default",
        // });

        setIsLoading(true);
        push(`/home?ref=${empresaId.current}`);
      }
      setOpenModalRevisao(!openModalRevisao);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(`Erro ao validar: ${JSON.stringify(err.response?.data)}`);
      console.log(error);
    }
  };

  const cancelarAgendamento = () => {
    setOpenModalRevisao(!openModalRevisao);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um serviço</p>
        <span className="text-xs text-slate-500">
          Escolha o serviço desejado
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-1 gap-3 pt-5 w-full">
          {state.barbeiro.servicos!.map((servico) => (
            <Button
              key={servico.id}
              variant="ghost"
              onClick={() => {
                setServicoSelecionado(servico);
                dispatch({
                  type: AgendamentoAction.setServico,
                  payload: servico,
                });
              }}
              className={`h-auto flex flex-col border-2 items-start p-4 justify-start text-left cursor-pointer${
                servicoSelecionado?.nome == servico.nome
                  ? "border-2 border-[#3f89c5]"
                  : ""
              }`}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-3 items-center justify-center">
                  <Scissors />
                  {servico.nome}
                </div>
                <div>
                  {servico.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div className="flex justify-between w-full mt-1 gap-2">
                <div className="text-slate-500 truncate">
                  {servico.descricao}
                </div>
                <div className="text-slate-500">{servico.duracao}min</div>
              </div>
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
              Anterior
            </Button>
          )}

          <Button
            className="cursor-pointer bg-[#3f89c5]"
            onClick={proximoPasso}
          >
            Próximo
          </Button>
        </div>

        <Modal
          title="Finalize seu agendamento"
          description="Preencha seus dados para confirmar o agendamento"
          open={openModal}
          setOpen={setOpenModal}
          handleSubmit={handleSubmit(finalizarAgendamento)}
          footerButtons={
            <>
              <Button
                className=" cursor-pointer"
                variant="secondary"
                onClick={() => setOpenModal(!open)}
              >
                Cancelar
              </Button>
              <Button
                className=" cursor-pointer"
                onClick={handleSubmit(finalizarAgendamento)}
              >
                Finalizar
              </Button>
            </>
          }
        >
          <DadosCliente register={register} errors={errors} />
        </Modal>

        <Modal
          title="Revisão de Agendamento"
          description="Revise todos os dados abaixo e confirme"
          open={openModalRevisao}
          setOpen={setOpenModalRevisao}
          schedule={confirmarAgendamento}
          footerButtons={
            <>
              <Button
                className="w-[150px] cursor-pointer"
                variant="secondary"
                onClick={cancelarAgendamento}
              >
                Cancelar
              </Button>
              <Button
                className="w-[150px] cursor-pointer"
                onClick={handleSubmit(confirmarAgendamento)}
              >
                Finalizar
              </Button>
            </>
          }
        >
          <Card className="my-5">
            <CardContent>
              <div className="grid grid-cols-2 gap-3 p-4">
                {review.map((item, index) => {
                  return (
                    <div className="flex gap-3" key={index}>
                      {item!.icon}
                      {String(item?.value)}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-row items-center gap-1">
            <p className="font-extrabold ">Valor:</p>
            <p className="text-sm">
              R$ {Number(state.servico.preco).toFixed(2)}
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};
