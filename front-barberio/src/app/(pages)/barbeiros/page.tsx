"use client";
import { Button } from "@/components/ui/button";
import { Star, UserPlus } from "lucide-react";
import { barbeiro } from "../../../model/barbeiro";
import { Card } from "@/components/ui/card";
// import { servicos } from "@/model/servico";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const barbeiros = () => {
  const { state, dispatch } = useFormReducer();
  const [openModal, setOpenModal] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  const formSchema = z.object({
    id: z.coerce.number(),
    nome: z
      .string()
      .min(2, { message: "Nome deve conter no mínimo 2 caracteres" }),
    email: z.string().email("Email inválido"),
    senha: z.string().min(7, "A senha precisa conter no mínimo 7 caracteres"),
    data_nascimento: z
      .string()
      .min(10, "A data precisa estar no formato: dd/MM/aaaa"),
    // servico: z.array(z.any()).nullable(),
    disponivel: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: barbeiro.length + 1,
      nome: "",
      email: "",
      senha: "",
      data_nascimento: "",
      disponivel: true,
      // servico: [],
    },
  });

  useEffect(() => {
    async function fetchData() {
      const apiData = await GETFuncionarios();
      setBabeiroLista(apiData);
    }
    fetchData();
  }, [state.barbeiro]);

  const onSubmit = async (barbeiro: z.infer<typeof formSchema>) => {
    const response = await SETFuncionario(
      barbeiro.nome,
      barbeiro.email,
      barbeiro.senha,
      barbeiro.data_nascimento,
      barbeiro.disponivel
    );

    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [...state.barbeiro, response.data],
    });

    if (response.status === 201) {
      toast.success("Barbeiro cadastrado com sucesso!");
    } else if (response.status === 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.error(response.statusText);
    }

    setOpenModal(false);
    form.reset();
  };

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
      payload: [...state.barbeiro, response.data],
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
    setBarbeiroSelecionado(undefined);
    setOpenModal(true);
    form.reset();
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

  return (
    <div className="w-full">
      <div className="w-full flex justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Barbeiros</p>
          <p className="text-slate-500">
            Gerencie os profissionais da barbearia.
          </p>
        </div>
        <Button onClick={abrirModal}>
          <UserPlus />
          Novo Barbeiro
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        {barbeiroLista.map((barbeiro) => (
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
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {barbeiroSelecionado ? "Editar Barbeiro" : "Cadastro de Barbeiro"}
            </DialogTitle>
            <DialogDescription>
              Preencha todos os dados necessários
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do barbeiro" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite aqui..." {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="*********"
                            type="password"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="data_nascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="dd/MM/aaaa"
                            {...field}
                            maxLength={10}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <FormField
                control={form.control}
                name="servico"
                render={({ field }) => {
                  const handleCheckBox = (id: string) => {
                    const novoValor = field.value.includes(id)
                      ? field.value.filter((item: string) => item != id)
                      : [...field.value, id];
                    field.onChange(novoValor);
                  };
                  return (
                    <FormItem>
                      <FormLabel>Serviços que realiza:</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2">
                          {servicos.map((servico) => (
                            <div
                              key={servico.id}
                              className="flex gap-3 items-center"
                            >
                              <Checkbox
                                id={servico.id}
                                checked={field.value?.includes(servico.id)}
                                onCheckedChange={() =>
                                  handleCheckBox(servico.id)
                                }
                              />
                              <label htmlFor={servico.id}>{servico.nome}</label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
              <FormField
                control={form.control}
                name="disponivel"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <div className="flex gap-3">
                        <Switch
                          className=""
                          id="disponivel"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormLabel>Disponível para agendamentos</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => setOpenModal(false)}
                  variant={"secondary"}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {barbeiroSelecionado ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default barbeiros;
