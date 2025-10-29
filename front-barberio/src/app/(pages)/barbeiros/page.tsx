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
import { useEffect, useMemo, useRef, useState } from "react";
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
  addServicoFuncionario,
  removeServicoFuncionario,
  ReativarFuncionario,
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
import Cookies from "js-cookie";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { validarToken } from "@/utils/functions";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
// import axiosInstance from "@/lib/axios";

const barbeiros = () => {
  const { state, dispatch } = useFormReducer();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<string[]>([]);
  const [exibirInativos, setExibirInativos] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const usuario = validarToken();

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
      .min(7, "A senha precisa conter no mínimo 7 caracteres"),
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
    servico: z.array(z.any()).nullable(),
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
  const [preview, setPreview] = useState<string | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [inicioData, setInicioData] = useState<Date>();
  const [fimData, setFimData] = useState<Date>();
  const [inicioHora, setInicioHora] = useState<string>("");
  const [fimHora, setFimHora] = useState<string>("");

  useEffect(() => {
    if (inicioData && inicioHora) {
      const dataFormatada = format(inicioData, "yyyy-MM-dd");
      form.setValue("fechamento_ini", `${dataFormatada}T${inicioHora}`);
    }
  }, [inicioData, inicioHora]);

  useEffect(() => {
    if (fimData && fimHora) {
      const dataFormatada = format(fimData, "yyyy-MM-dd");
      form.setValue("fechamento_fim", `${dataFormatada}T${fimHora}`);
    }
  }, [fimData, fimHora]);

  const onSubmit = async (barbeiro: BarbeiroFormData) => {
    let urlPublica = barbeiroSelecionado?.avatar ?? "";
    if (imagemSelecionada) {
      const base64 = await fileToBase64(imagemSelecionada);
      const resUpload = await axios.post("/api/avatar-upload", {
        base64,
        NomeBarbeiro: barbeiro.nome,
        idBarbeiro: barbeiroSelecionado?.id,
      });
      urlPublica = resUpload.data.publicUrl;
    }
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

      dispatch({
        type: AgendamentoAction.setBarbeiro,
        payload: [response.data],
      });
    }
    setPreview(null);
    setImagemSelecionada(null);
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

  async function handleEditService(
    isChecked: string | boolean,
    funcionarioId: number,
    servicoId: number
  ) {
    if (isChecked) {
      //todo:logica de chamar o endpoint aqui
      const response = await addServicoFuncionario(funcionarioId, servicoId);

      if (response.status === 200) {
        toast.success("Serviços atualizados");
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

  // LÓGICA PARA PEGAR IMAGEM E JOGAR NO LOCALSTORAGE, PRONTO PARA
  /// JOGAR NO REPOSITORIO CORRETO.

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

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
              setOpenModal={setOpenModal}
            />
          ))}
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {barbeiroSelecionado ? "Editar Barbeiro" : "Cadastro de Barbeiro"}
            </DialogTitle>
            <DialogDescription>
              Preencha todos os dados necessários
            </DialogDescription>
          </DialogHeader>

          <div className="relative flex items-center justify-center">
            <input
              type="file"
              ref={avatarRef}
              className="absolute w-0 h-0 opacity-0"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImagemSelecionada(file);
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }
              }}
            />
            <button
              onClick={() => avatarRef.current?.click()}
              type="button"
              className="relative h-32 w-32 rounded-full border-4 border-[#3f89c5] shadow shadow-primary hover:shadow-primary/20 transition-all duration-300 cursor-pointer bg-primary text-white overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="avatar preview"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : barbeiroSelecionado?.avatar ? (
                <img
                  src={barbeiroSelecionado.avatar}
                  alt="avatar"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <p className="font-bold text-3xl">
                  {barbeiroSelecionado?.nome.split("")[0]}
                </p>
              )}
            </button>{" "}
          </div>
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
                                      servico.id as number
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

              <Card className="p-3">
                <p className="font-semibold text-sm text-center">
                  Fechar Horário
                </p>
                <div className="w-full flex items-center justify-center gap-3">
                  {/* CAMPO INÍCIO */}
                  <FormField
                    control={form.control}
                    name="fechamento_ini"
                    render={() => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Início</FormLabel>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="date"
                            className="w-[150px]"
                            placeholder="dd/MM/aaaa"
                            value={
                              inicioData ? format(inicioData, "yyyy-MM-dd") : ""
                            }
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              const inicioDataSelecionada = new Date(
                                e.target.value
                              );
                              inicioDataSelecionada.setDate(
                                inicioDataSelecionada.getDate() + 1
                              );
                              setInicioData(inicioDataSelecionada);
                            }}
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={inicioHora}
                              onChange={(e) => setInicioHora(e.target.value)}
                              className="border border-input rounded-md px-2 py-1 text-sm w-[150px] bg-background"
                            />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CAMPO FIM */}
                  <FormField
                    control={form.control}
                    name="fechamento_fim"
                    render={() => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Fim</FormLabel>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="date"
                            className="w-[150px]"
                            placeholder="dd/MM/aaaa"
                            value={fimData ? format(fimData, "yyyy-MM-dd") : ""}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              const fimDataSelecionada = new Date(
                                e.target.value
                              );
                              fimDataSelecionada.setDate(
                                fimDataSelecionada.getDate() + 1
                              );
                              setFimData(fimDataSelecionada);
                            }}
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={fimHora}
                              onChange={(e) => setFimHora(e.target.value)}
                              className="border border-input rounded-md px-2 py-1 text-sm w-[150px] bg-background"
                            />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
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
