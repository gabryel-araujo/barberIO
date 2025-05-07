import { useEffect, useState } from "react";
import { AgendamentoAction, useForm } from "@/contexts/AgendamentoContext";
import { Button } from "@/components/ui/button";
import { servicos } from "@/model/servico";
import { Servico } from "@/types/servico";
import { Scissors } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const Step4 = () => {
  const { state, dispatch } = useForm();
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico>(
    state.servico
  );
  const [nome, setNome] = useState(state.nome);
  const [email, setEmail] = useState(state.email);
  const [telefone, setTelefone] = useState(state.telefone);
  const [openModal, setOpenModal] = useState(true);
  const { push } = useRouter();

  function proximoPasso() {
    dispatch({
      type: AgendamentoAction.setServico,
      payload: servicoSelecionado,
    });
    if (state.currentStep == 5) {
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
    }
  }
  const finalizarAgendamento = () => {
    dispatch({
      type: AgendamentoAction.setNome,
      payload: nome,
    });
    dispatch({
      type: AgendamentoAction.setEmail,
      payload: email,
    });
    dispatch({
      type: AgendamentoAction.setTelefone,
      payload: telefone,
    });
    //push("/");
  };

  useEffect(() => {
    console.log("Estado Atualizado:", state);
    setOpenModal(!openModal);
    setNome("");
    setEmail("");
    setTelefone("");
  }, [state]);

  return (
    <div className="border rounded-lg mx-50 p-5 shadow">
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
              onClick={() => setServicoSelecionado(servico)}
              className={`h-auto w-[650px] flex flex-col border-2 items-start p-4 justify-start text-left ${
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
              <div className="flex justify-between w-full mt-1">
                <div className="text-slate-500">{servico.descricao}</div>
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
              Antes
            </Button>
          )}

          <Button className="cursor-pointer" onClick={proximoPasso}>
            Próximo
          </Button>
        </div>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogTrigger></DialogTrigger>
            <DialogHeader>
              <DialogTitle>Digite seus dados</DialogTitle>
              <DialogDescription>
                digite todos os dados solicitados
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm">Nome</p>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <p className="text-sm">Email</p>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="text-sm">Telefone</p>
                <Input
                  type="text"
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-5">
              <Button
                className="w-[150px] cursor-pointer"
                variant="destructive"
                onClick={() => setOpenModal(!openModal)}
              >
                Cancelar
              </Button>
              <Button
                className="w-[150px] cursor-pointer"
                onClick={finalizarAgendamento}
              >
                Finalizar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
