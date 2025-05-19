import { useState } from "react";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { Button } from "@/components/ui/button";
import { servicos } from "@/model/servico";
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

export const Step4 = () => {
  const { state, dispatch } = useForm();
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico>(
    state.servico
  );
  const [openModal, setOpenModal] = useState(false);
  const [openModalRevisao, setOpenModalRevisao] = useState(false);

  const { push } = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormZod<FormData>({ resolver: zodResolver(schema) });

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
      value: state.barbeiro,
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
    if (state.servico.id === "") {
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
          id: "",
          nome: "",
          valor: 0,
          descricao: "",
        } as Servico,
      });
    }
  }

  const finalizarAgendamento = (data: FormData) => {
    dispatch({
      type: AgendamentoAction.setNome,
      payload: data.name,
    });
    dispatch({
      type: AgendamentoAction.setEmail,
      payload: data.email,
    });
    dispatch({
      type: AgendamentoAction.setTelefone,
      payload: data.phone,
    });

    console.log(data);
    setOpenModal(!openModal);
    setOpenModalRevisao(!openModalRevisao);
  };

  const confirmarAgendamento = () => {
    console.log("Estado Atualizado:", state);
    toast.success("Agendamento realizado com sucesso!");
    setTimeout(() => {
      push("/");
    }, 2000);

    //todo:consumo da api para executar o agendamento
    setOpenModalRevisao(!openModalRevisao);
  };

  const cancelarAgendamento = () => {
    setOpenModalRevisao(!openModalRevisao);
  };

  return (
    <div className="border rounded-lg md:mx-50 p-5 shadow bg-white">
      <div>
        <p className="text-2xl font-bold">Escolha um serviço</p>
        <span className="text-xs text-slate-500">
          Escolha o serviço desejado
        </span>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-1 gap-3 pt-5">
          {servicos.map((servico) => (
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
              className={`h-auto md:w-[650px] w-[300px] flex flex-col border-2 items-start p-4 justify-start text-left cursor-pointer${
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
                <div>R$ {servico.valor.toFixed(2)}</div>
              </div>
              <div className="flex justify-between w-full mt-1 gap-2">
                <div className="text-slate-500 overflow-auto">
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

          <Button className="cursor-pointer" onClick={proximoPasso}>
            Próximo
          </Button>
        </div>

        <Modal
          title="Finalize seu agendamento"
          description="Preencha seus dados para confirmar o agendamento"
          open={openModal}
          setOpen={setOpenModal}
          handleSubmit={handleSubmit(finalizarAgendamento)}
        >
          <DadosCliente register={register} errors={errors} />
        </Modal>

        <Modal
          title="Revisão de Agendamento"
          description="Revise todos os dados abaixo e confirme"
          open={openModalRevisao}
          setOpen={setOpenModalRevisao}
          schedule={confirmarAgendamento}
        >
          <Card className="my-5">
            <CardContent>
              <div className="grid grid-cols-2 gap-3 p-4">
                {review.map((item, index) => {
                  return (
                    <div className="flex gap-3" key={index}>
                      {item!.icon}
                      {item?.value}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-row items-center gap-1">
            <p className="font-extrabold ">Valor:</p>
            <p className="text-sm">R$ {state.servico.valor.toFixed(2)}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};
