"use client";
import { Button } from "@/components/ui/button";
import { Filter, UserPlus } from "lucide-react";
// import { servicos } from "@/model/servico";
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
  PUTFuncionario,
  POSTFuncionario,
  DELETEFuncionario,
  addServicoFuncionario,
  removeServicoFuncionario,
} from "@/lib/api/funcionarios";
import { useForm as useFormReducer } from "@/contexts/AgendamentoContextProvider";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { toast } from "sonner";
import { BarberCard } from "../../../../components/BarberCard";
import { Switch } from "@/components/ui/switch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { Checkbox } from "@/components/ui/checkbox";
import { Servico } from "@/types/servico";
import { DialogComponent } from "@/components/layout/DialogComponent";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const barbeiros = () => {
  const { state, dispatch } = useFormReducer();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<string[]>([]);
  const [exibirInativos, setExibirInativos] = useState(false);
  const formSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "Nome deve conter no mínimo 2 caracteres" }),
    email: z.string().email("Email inválido"),
    senha: z.string().min(7, "A senha precisa conter no mínimo 7 caracteres"),
    data_nascimento: z
      .string()
      .optional()
      .refine(
        (val) => {
          return val === undefined || val === "" || val.length >= 10;
        },
        {
          message: "A data precisa estar no formato: dd/MM/aaaa",
        }
      ),
    servico: z.array(z.any()).nullable(),
    disponivel: z.boolean(),
  });

  const editFormSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "Nome deve conter no mínimo 2 caracteres" }),
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .optional()
      .refine(
        (val) => {
          return val == null || val === "" || val.length >= 7;
        },
        {
          message: "A senha precisa conter no mínimo 7 caracteres",
        }
      ),
    data_nascimento: z
      .string()
      .optional()
      .refine(
        (val) => {
          return val === undefined || val === "" || val.length >= 10;
        },
        {
          message: "A data precisa estar no formato: dd/MM/aaaa",
        }
      ),
    servico: z.array(z.any()).nullable(),
    disponivel: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      barbeiroSelecionado ? editFormSchema : formSchema
    ) as any,
    defaultValues: {
      //id: barbeiro.length + 1,
      nome: "",
      email: "",
      senha: "",
      data_nascimento: "",
      disponivel: true,
      servico: [],
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchData() {
      const response = await GETFuncionarios();
      const apiData = response;
      const funcionariosFiltrado = exibirInativos
        ? apiData
        : apiData.filter(
            (funcionarios: Barbeiro) => funcionarios.ativo === true
          );
      setBabeiroLista(funcionariosFiltrado);
    }
    fetchData();
  }, [state.barbeiro, exibirInativos]);

  const onSubmit = async (barbeiro: z.infer<typeof formSchema>) => {
    const response = await POSTFuncionario(
      barbeiro.nome,
      barbeiro.email,
      barbeiro.senha,
      barbeiro.data_nascimento!,
      barbeiro.disponivel,
      servicoSelecionado
    );
    console.log(servicoSelecionado);
    console.log(response.data);
    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 201) {
      toast.success("Barbeiro cadastrado com sucesso!");
    } else if (response.status === 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.error(response.statusText);
    }

    queryClient.invalidateQueries({ queryKey: ["servicos"] });
    setOpenModal(false);
    form.reset();
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

  const handleEditBarbeiro = async (barbeiro: Barbeiro) => {
    const newBarber = form.getValues();

    const response = await PUTFuncionario(
      barbeiro.id,
      newBarber.nome,
      newBarber.email,
      newBarber.data_nascimento!,
      newBarber.disponivel,
      newBarber.senha != "" ? newBarber.senha : barbeiro.senha
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
    setOpenModal(false);
  };

  async function handleDeleteBarbeiro(value: Barbeiro) {
    const response = await DELETEFuncionario(value);

    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 200) {
      toast.success("Barbeiro excluído com sucesso!");
    } else if (response.status >= 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.log(response);
      console.error(response.statusText);
    }
  }

  useQuery({
    queryKey: ["servicos"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/servico`);
      setServicos(response.data);
      return response.data;
    },
    staleTime: 5 * (60 * 1000),
  });

  async function handleEditService(
    isChecked: string | boolean,
    funcionarioId: number,
    servicoId: number
  ) {
    if (isChecked) {
      //todo:logica de chamar o endpoint aqui
      const response = await addServicoFuncionario(funcionarioId, servicoId);

      if (response.status === 200) {
        toast.warning("Atualizando serviços...");
      } else {
        toast.error("Oops ocorreu um erro!");
        console.log(response);
      }
    } else {
      //todo:logica de chamar o endpoint aqui

      const response = await removeServicoFuncionario(funcionarioId, servicoId);

      if (response.status === 200) {
        toast.warning("Atualizando serviços...");
      } else {
        toast.error("Oops ocorreu um erro!");
        console.log(response);
      }
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Barbeiros</p>
          <p className="text-slate-500">
            Gerencie os profissionais da barbearia
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={abrirModal}>
            <UserPlus />
            Novo Barbeiro
          </Button>
          {/* filtro de inatividade e talvez outras funcionalidades */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"outline"}>
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Exibição</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={exibirInativos}
                onCheckedChange={setExibirInativos}
              >
                Exibir Inativos
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {barbeiroLista
          .sort((a, b) => b.id - a.id)
          .map((barbeiro) => (
            <BarberCard
              barbeiro={barbeiro}
              form={form}
              setBarbeiroSelecionado={setBarbeiroSelecionado}
              setOpenModal={setOpenModal}
            />
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
              <FormField
                control={form.control}
                name="servico"
                render={({ field }) => {
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
                                id={String(servico.id)}
                                checked={field.value?.includes(
                                  String(servico.id)
                                )}
                                onCheckedChange={(isChecked) => {
                                  // 1. Calcular o novo array de IDs selecionados
                                  const currentSelectedIds = field.value || [];
                                  let newSelectedIds;
                                  const currentServiceIdStr = String(
                                    servico.id
                                  );

                                  if (isChecked) {
                                    newSelectedIds = [
                                      ...currentSelectedIds,
                                      currentServiceIdStr,
                                    ];
                                  } else {
                                    newSelectedIds = currentSelectedIds.filter(
                                      (id: string) => id !== currentServiceIdStr
                                    );
                                  }
                                  field.onChange(newSelectedIds);
                                  setServicoSelecionado(newSelectedIds);

                                  if (barbeiroSelecionado) {
                                    handleEditService(
                                      isChecked,
                                      barbeiroSelecionado.id,
                                      servico.id
                                    );
                                  }
                                }}
                              />
                              <label htmlFor={String(servico.id)}>
                                {servico.nome}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
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
                {barbeiroSelecionado && (
                  <Button
                    onClick={() => {
                      setOpenDialog(!openDialog);
                      setOpenModal(!openModal);
                    }}
                    variant={"destructive"}
                    type="button"
                  >
                    Excluir
                  </Button>
                )}

                <Button
                  onClick={() => setOpenModal(false)}
                  variant={"secondary"}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  type={barbeiroSelecionado ? "button" : "submit"}
                  onClick={() => {
                    if (barbeiroSelecionado) {
                      handleEditBarbeiro(barbeiroSelecionado);
                    }
                  }}
                >
                  {barbeiroSelecionado ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DialogComponent
        title={`Você deseja excluir o barbeiro ${barbeiroSelecionado?.nome}?`}
        actionLabel="Excluir"
        open={openDialog}
        setOpen={setOpenDialog}
        action={() => handleDeleteBarbeiro(barbeiroSelecionado!)}
      />
    </div>
  );
};
export default barbeiros;
