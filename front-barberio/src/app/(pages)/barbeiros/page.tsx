"use client";
import { Button } from "@/components/ui/button";
import { Star, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
// import { servicos } from "@/model/servico";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";

// import { Checkbox } from "@/components/ui/checkbox";
import { Barbeiro } from "@/types/barbeiro";
import {
  GETFuncionarios,
  SETFuncionario,
  changeStatus,
} from "@/lib/api/funcionarios";
import { useForm as useFormReducer } from "@/contexts/AgendamentoContextProvider";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { toast } from "sonner";
import { Modal } from "@/components/layout/Modal";
import { BarberForm } from "../../../../components/BarberForm";

const barbeiros = () => {
  const { state, dispatch } = useFormReducer();
  const [openModal, setOpenModal] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  // const formSchema = z.object({
  //   //id: z.coerce.number(),
  //   nome: z
  //     .string()
  //     .min(2, { message: "Nome deve conter no mínimo 2 caracteres" }),
  //   email: z.string().email("Email inválido"),
  //   senha: z.string().min(7, "A senha precisa conter no mínimo 7 caracteres"),
  //   data_nascimento: z
  //     .string()
  //     .min(10, "A data precisa estar no formato: dd/MM/aaaa"),
  //   // servico: z.array(z.any()).nullable(),
  //   disponivel: z.boolean(),
  // });

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     //id: barbeiro.length + 1,
  //     nome: "",
  //     email: "",
  //     senha: "",
  //     data_nascimento: "",
  //     disponivel: true,
  //     // servico: [],
  //   },
  // });

  useEffect(() => {
    async function fetchData() {
      const apiData = await GETFuncionarios();
      setBabeiroLista(apiData);
    }
    fetchData();
  }, [state.barbeiro]);

  // const onSubmit = async (barbeiro: z.infer<typeof formSchema>) => {
  //   const response = await SETFuncionario(
  //     barbeiro.nome,
  //     barbeiro.email,
  //     barbeiro.senha,
  //     barbeiro.data_nascimento,
  //     barbeiro.disponivel
  //   );

  //   dispatch({
  //     type: AgendamentoAction.setBarbeiro,
  //     payload: [response.data],
  //   });

  //   if (response.status === 201) {
  //     toast.success("Barbeiro cadastrado com sucesso!");
  //   } else if (response.status === 400) {
  //     toast.error("Erro na requisição! Verifique os dados");
  //   } else {
  //     toast.error("Oops, ocorreu um erro!");
  //   }

  //   setOpenModal(false);
  //   form.reset();
  // };

  const updateStatus = async (barbeiro: Barbeiro) => {
    const response = await changeStatus(
      barbeiro.id,
      barbeiro.nome,
      barbeiro.email,
      barbeiro.senha,
      !barbeiro.disponivel
    );

    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 200) {
      toast.success("Barbeiro atualizado com sucesso!");
    } else if (response.status >= 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.log(response);
      console.error(response.statusText);
    }
  };

  const abrirModal = () => {
    form.reset({
      nome: "",
      email: "",
      senha: "",
      data_nascimento: "",
      disponivel: true,
    });
    setBarbeiroSelecionado(undefined);
    setOpenModal(true);
  };

  const handleEditBarbeiro = (barbeiro: Barbeiro) => {
    console.log(barbeiro);
    form.reset({
      nome: barbeiro.nome,
      email: barbeiro.email,
      senha: "",
      data_nascimento: barbeiro.data_nascimento,
      disponivel: barbeiro.disponivel,
    });

    const barbeiroAtualizado: Barbeiro = {
      ...barbeiro,
      atendimentos: 30,
    };

    console.log("atualizado:", barbeiroAtualizado);
  };
  //todo: criar o card barbeiro para modularizar mais

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Barbeiros</p>
          <p className="text-slate-500">
            Gerencie os profissionais da barbearia
          </p>
        </div>
        <Button onClick={abrirModal}>
          <UserPlus />
          Novo Barbeiro
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {barbeiroLista
          .sort((a, b) => b.id - a.id)
          .map((barbeiro) => (
            <Card className="" key={barbeiro.id}>
              <div className="rounded-t-md p-3 bg-slate-800 flex justify-start items-center gap-3">
                <div className="border rounded-full h-14 min-w-14 bg-slate-700 items-center justify-center flex text-white">
                  <p className="font-bold text-3xl">
                    {barbeiro.nome.split("")[0]}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-bold text-slate-100">{barbeiro.nome}</p>
                    <p
                      className={`font-semibold
                    ${barbeiro.disponivel ? "text-green-300" : "text-red-400"}`}
                    >
                      {barbeiro.disponivel ? "Disponível" : "Indisponível"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <p className="text-amber-300 font-bold">
                      {barbeiro.avaliacao}
                    </p>
                    <Star fill="yellow" color="#ffd230" />
                  </div>
                </div>
              </div>

              <div className="px-3">
                <p className="text-sm font-semibold">Serviços:</p>
                <span className="">
                  {barbeiro.servicos?.map((servico) => {
                    return (
                      <span
                        key={servico.id}
                        className="ml-3 bg-slate-100 rounded-sm text-slate-800 text-xs px-2 py-0.5"
                      >
                        {servico.nome}
                      </span>
                    );
                  })}
                </span>
              </div>
              <div className="w-full px-3 py-3 flex justify-between items-center">
                <Button
                  onClick={() => {
                    handleEditBarbeiro(barbeiro);
                    setBarbeiroSelecionado(barbeiro);
                    setOpenModal(true);
                  }}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  Gerenciar
                </Button>
                <div className="flex gap-3">
                  <Switch
                    id="disponivel"
                    checked={barbeiro.disponivel}
                    onCheckedChange={() => {
                      updateStatus(barbeiro);
                    }}
                  />
                  <Label htmlFor="disponivel" className="font-normal">
                    {barbeiro.disponivel ? "Disponível" : "Indisponível"}
                  </Label>
                </div>
              </div>
            </Card>
          ))}
      </div>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title={barbeiroSelecionado ? "Editar Barbeiro" : "Cadastro de Barbeiro"}
        description="Preencha todos os dados necessários"
        buttonLabel={barbeiroSelecionado ? "Atualizar" : "Cadastrar"}
        handleSubmit={() =>
          barbeiroSelecionado
            ? onSubmit(barbeiroSelecionado!)
            : onSubmit(form.getValues() as Barbeiro)
        }
      >
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3"> */}
        <BarberForm form={form} onSubmit={onSubmit} />
        {/* </form> */}
        {/* </Form> */}
      </Modal>
    </div>
  );
};
export default barbeiros;
