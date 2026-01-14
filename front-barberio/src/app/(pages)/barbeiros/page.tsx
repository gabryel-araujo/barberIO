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
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Barbeiro } from "@/types/barbeiro";
import {
  GETFuncionarios,
  PUTFuncionario,
  POSTFuncionario,
  DELETEFuncionario,
  ReativarFuncionario,
} from "@/lib/api/funcionarios";
import { useForm as useFormReducer } from "@/contexts/AgendamentoContextProvider";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { toast } from "sonner";
import { BarberCard } from "../../../../components/BarberCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
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
import Cookies from "js-cookie";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { validarToken } from "@/utils/functions";
import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";

const barbeiros = () => {
  const { state, dispatch } = useFormReducer();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  const [, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado] = useState<string[]>([]);
  const [exibirInativos, setExibirInativos] = useState(false);

  const usuario = validarToken();
  const router = useRouter();
  const formSchema = z.object({
    nome: z
      .string()
      .trim()
      .min(2, { message: "Nome deve conter no mínimo 2 caracteres" })
      .regex(/^[a-zA-ZáàâãäéèêëíìîïóòôõöúùûüçÇ\s]*$/, {
        message: "Digite um nome válido",
      }),
    email: z.string().trim().email("Email inválido"),
    senha: z
      .string()
      .trim()
      .min(7, "A senha precisa conter no mínimo 7 caracteres")
      .optional(),
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
    servico: z.array(z.any()).optional(),
    disponivel: z.boolean(),
    avatar: z
      .string()
      .url("URL inválida")
      .or(z.literal(""))
      .nullable()
      .optional(),
    tipo: z.string(),
    fechamento_ini: z.string().optional(),
    fechamento_fim: z.string().optional(),
    //ativo: z.boolean(),
  });

  const editFormSchema = z.object({
    nome: z
      .string()
      .trim()
      .min(2, { message: "Nome deve conter no mínimo 2 caracteres" })
      .regex(/^[a-zA-ZáàâãäéèêëíìîïóòôõöúùûüçÇ\s]*$/, {
        message: "Digite um nome válido",
      }),
    email: z.string().trim().email("Email inválido"),
    senha: z
      .string()
      .trim()
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
      .union([z.string(), z.null()])
      .optional()
      .refine(
        (val) => {
          return (
            val === undefined || val === "" || val === null || val.length >= 10
          );
        },
        {
          message: "A data precisa estar no formato: dd/MM/aaaa",
        }
      ),
    servico: z.array(z.any()).optional(),
    disponivel: z.boolean(),
    avatar: z
      .string()
      .url("URL inválida")
      .or(z.literal(""))
      .nullable()
      .optional(),
    tipo: z.string(),
    fechamento_ini: z.string().optional(),
    fechamento_fim: z.string().optional(),
  });
  const schema = useMemo(() => {
    return barbeiroSelecionado ? editFormSchema : formSchema;
  }, [barbeiroSelecionado]);

  type BarbeiroFormData =
    | z.infer<typeof formSchema>
    | z.infer<typeof editFormSchema>;

  const form = useForm<BarbeiroFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      data_nascimento: "",
      disponivel: true,
      servico: [],
      avatar: "",
      tipo: "BARBEIRO",
      fechamento_ini: undefined,
      fechamento_fim: undefined,
    },
  });
  console.log(form.formState.errors);
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

  const onSubmit = async (barbeiro: BarbeiroFormData) => {
    let urlPublica = barbeiroSelecionado?.avatar ?? "";
    if (!barbeiroSelecionado) {
      // Cadastro
      const response = await POSTFuncionario(
        barbeiro.nome,
        barbeiro.email,
        barbeiro.senha!,
        barbeiro.data_nascimento!,
        barbeiro.disponivel,
        servicoSelecionado,
        undefined,
        barbeiro.tipo
      );

      if (response.status === 201) {
        toast.success("Barbeiro cadastrado com sucesso!");
      } else if (response.status === 400) {
        toast.error("Erro na requisição! Verifique os dados");
      } else {
        toast.error("Oops, ocorreu um erro!");
      }

      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: [response.data],
      });
    } else {
      // Edição
      const response = await PUTFuncionario(
        barbeiroSelecionado.id,
        barbeiro.nome,
        barbeiro.email,
        barbeiro.data_nascimento!,
        barbeiro.disponivel,
        barbeiro.senha ? barbeiro.senha : barbeiroSelecionado.senha,
        barbeiroSelecionado.ativo,
        urlPublica,
        barbeiro.tipo,
        barbeiro.fechamento_ini,
        barbeiro.fechamento_fim,
        barbeiroSelecionado.atendimentos
      );

      if (response.status === 200) {
        toast.success("Barbeiro atualizado com sucesso!");
      } else if (response.status >= 400) {
        toast.error("Erro na requisição! Verifique os dados");
      } else {
        toast.error("Oops, ocorreu um erro!");
      }

      if (barbeiroSelecionado.id === usuario?.id) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.warning("Faça Login para validação");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.replace("/login");
      }

      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: [response.data],
      });
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
      tipo: "BARBEIRO",
    });
    setBarbeiroSelecionado(undefined);
    setOpenModal(true);
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
  async function handleReativarBarbeiro(value: Barbeiro) {
    const response = await ReativarFuncionario(value);
    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 200) {
      toast.success("Barbeiro Ativado com sucesso!");
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
      const response = await axios.get(`${baseUrl}/servico`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      setServicos(response.data);
      return response.data;
    },
    staleTime: 5 * (60 * 1000),
  });
  return (
    <div className="w-full min-h-screen bg-[#e6f0ff]">
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
              direcionar={() => router.replace(`/barbeiro/${barbeiro.id}`)}
            />
          ))}
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="overflow-y-auto md:min-w-3xl">
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
                            type="date"
                            placeholder="dd/MM/aaaa"
                            {...field}
                            value={field.value ?? ""}
                            max={new Date().toISOString().split("T")[0]}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {usuario?.role === "GESTOR" && (
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem className="border p-2 rounded-md">
                      <FormLabel>Tipo:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          defaultValue="BARBEIRO"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-6"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="BARBEIRO" id="barbeiro" />
                            <Label htmlFor="barbeiro">Barbeiro</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="GESTOR" id="gestor" />
                            <Label htmlFor="gestor">Gestor</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex items-center justify-between gap-3">
                {barbeiroSelecionado && barbeiroSelecionado.ativo === false && (
                  <div>
                    <Button
                      type="button"
                      className="bg-green-600 hover:bg-green-500"
                      variant="default"
                      onClick={() => {
                        setOpenDialog(!openDialog);
                        setOpenModal(!openModal);
                      }}
                    >
                      Ativar
                    </Button>
                  </div>
                )}
                {barbeiroSelecionado && barbeiroSelecionado.ativo === true && (
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
                <div>
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
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DialogComponent
        className={`${
          barbeiroSelecionado?.ativo === false
            ? "bg-green-600 hover:bg-green-500"
            : ""
        }`}
        title={`Você deseja ${
          barbeiroSelecionado?.ativo === false ? "Ativar" : "excluir"
        } o barbeiro ${barbeiroSelecionado?.nome}?`}
        actionLabel={`${
          barbeiroSelecionado?.ativo === false ? "Ativar" : "Excluir"
        }`}
        open={openDialog}
        setOpen={setOpenDialog}
        action={
          barbeiroSelecionado?.ativo === true
            ? () => handleDeleteBarbeiro(barbeiroSelecionado!)
            : () => handleReativarBarbeiro(barbeiroSelecionado!)
        }
      />
    </div>
  );
};
export default barbeiros;
