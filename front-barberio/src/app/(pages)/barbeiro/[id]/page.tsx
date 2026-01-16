"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DELETEFuncionario,
  GETUmFuncionario,
  PUTFuncionario,
  ReativarFuncionario,
} from "@/lib/api/funcionarios";
import { GETServicos } from "@/lib/api/servico";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CardServico } from "../components/cardServico";
import { toast } from "sonner";
import { Barbeiro } from "@/types/barbeiro";
import { adicionarServico, removerServico } from "../functions/functions";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Award, Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fileToBase64, validarToken } from "@/utils/functions";
import axios from "axios";
import { DialogComponent } from "@/components/layout/DialogComponent";

const Barbeiros = () => {
  const params = useParams();
  const idBarbeiro = String(params.id);
  const queryClient = useQueryClient();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const usuario = validarToken();

  const { data } = useQuery({
    queryKey: ["barbeiro", idBarbeiro],
    queryFn: () => GETUmFuncionario(idBarbeiro),
  });

  const { data: servicos } = useQuery({
    queryKey: ["servicos"],
    queryFn: () => GETServicos(),
  });

  async function handleDeleteBarbeiro(value: Barbeiro) {
    const response = await DELETEFuncionario(value);

    if (response.status === 200) {
      toast.success("Barbeiro excluído com sucesso!");
      router.replace("/barbeiros");
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

    if (response.status === 200) {
      toast.success("Barbeiro Ativado com sucesso!");
      router.replace("/barbeiros");
    } else if (response.status >= 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
      console.log(response);
      console.error(response.statusText);
    }
  }

  const [formData, setFormData] = useState<Barbeiro>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    data_nascimento: "",
    servicos: [],
    avatar: "",
    tipo: "BARBEIRO",
    fechamento_ini: undefined,
    fechamento_fim: undefined,
    ativo: undefined,
    comissao: Number(""),
    disponivel: undefined,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        nome: data?.nome || "",
        email: data?.email || "",
        senha: data?.senha || "",
        data_nascimento: data?.data_nascimento || "",
        avatar: data?.avatar || "",
        tipo: data?.tipo || "",
        servicos: data?.servicos || [],
        fechamento_ini: data?.fechamento_ini ?? undefined,
        fechamento_fim: data?.fechamento_fim ?? undefined,
        ativo: data.ativo ?? undefined,
        comissao: data?.comissao ?? undefined,
        disponivel: data?.disponivel ?? undefined,
      });
    }
  }, [data]);

  async function handleAdicionarServico(
    idBarbeiro: number,
    idServico: number,
    checked: boolean
  ) {
    try {
      setFormData((prev) => {
        const servicosAtuais = prev.servicos ?? [];

        if (checked) {
          // → ADICIONAR SERVIÇO
          const servicoCompleto = servicos?.find((s) => s.id === idServico);
          if (!servicoCompleto) return prev;

          return {
            ...prev,
            servicos: [...servicosAtuais, servicoCompleto],
          };
        }

        // → REMOVER SERVIÇO
        return {
          ...prev,
          servicos: servicosAtuais.filter((s) => s.id !== idServico),
        };
      });
      if (checked) {
        await adicionarServico(idBarbeiro, idServico);
        toast.success("Serviço Adicionado com sucesso!");
      } else {
        await removerServico(idBarbeiro, idServico);
        toast.success("Serviço Removido com sucesso!");
      }
      queryClient.invalidateQueries({
        queryKey: ["barbeiro", idBarbeiro],
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  const [inicioData, setInicioData] = useState<Date>();
  const [fimData, setFimData] = useState<Date>();
  const [inicioHora, setInicioHora] = useState<string>("");
  const [fimHora, setFimHora] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (inicioData && inicioHora) {
      const dataFormatada = format(inicioData, "yyyy-MM-dd");
      setFormData((prev) => ({
        ...prev,
        fechamento_ini: `${dataFormatada}T${inicioHora}`,
      }));
    }
  }, [inicioData, inicioHora]);

  useEffect(() => {
    if (fimData && fimHora) {
      const dataFormatada = format(fimData, "yyyy-MM-dd");
      setFormData((prev) => ({
        ...prev,
        fechamento_fim: `${dataFormatada}T${fimHora}`,
      }));
    }
  }, [fimData, fimHora]);

  const onSubmit = async (barbeiro: Barbeiro) => {
    console.log(barbeiro);
    let urlPublica = data?.avatar ?? "";
    if (imagemSelecionada) {
      const base64 = await fileToBase64(imagemSelecionada);
      const resUpload = await axios.post("/api/avatar-upload", {
        base64,
        NomeBarbeiro: barbeiro.nome,
        idBarbeiro: data?.id,
      });
      urlPublica = resUpload.data.publicUrl;
    }
    const response = await PUTFuncionario(
      data!.id,
      barbeiro.nome,
      barbeiro.email,
      barbeiro.data_nascimento!,
      barbeiro.disponivel!,
      barbeiro.senha ? barbeiro.senha : data!.senha,
      barbeiro!.ativo,
      urlPublica,
      barbeiro.tipo,
      barbeiro.fechamento_ini!,
      barbeiro.fechamento_fim!,
      barbeiro!.atendimentos,
      barbeiro?.comissao
    );

    if (response.status === 200) {
      toast.success("Barbeiro atualizado com sucesso!");
    } else if (response.status >= 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
    }

    if (data!.id === usuario?.id) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.warning("Faça Login para validação");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/login");
    }

    // dispatch({
    //   type: AgendamentoAction.setBarbeiro,
    //   payload: [response.data],
    // });
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 bg-[#e6f0ff]">
      <aside className="sticky top-0 z-10  backdrop-blur-md supports-[backdrop-filter]:bg-[#e6f0ff]/60 p-6 flex md:flex-row items-center justify-between gap-3 md:px-10">
        <div className="flex items-center gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/home">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/barbeiros">Barbeiros</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data?.nome}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <Button onClick={() => onSubmit(formData)}>Salvar alterações</Button>
        </div>
      </aside>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lado Maior */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-row p-6">
            <CardHeader className="flex md:flex-row items-center gap-6">
              <div className="relative border-2 border-[#3f89c5] rounded-full h-20 w-20 bg-slate-700 items-center justify-center flex text-white">
                {/* INICIO AVATAR */}
                <div className="space-y-2">
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
                      className="relative h-20 w-20 rounded-full border-4 border-[#3f89c5] shadow shadow-primary hover:shadow-primary/20 transition-all duration-300 cursor-pointer bg-primary text-white overflow-hidden"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="avatar preview"
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                      ) : data?.avatar ? (
                        <img
                          src={data.avatar}
                          alt="avatar"
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                      ) : (
                        <img
                          src={`${data?.avatar || "/imagens/default.png"}`}
                          sizes="56px"
                          alt="avatar"
                          //onError={() => setErroImagem(true)}
                          className="absolute rounded-full inset-0 h-full w-full object-cover object-center"
                        />
                      )}
                    </button>{" "}
                  </div>
                </div>
                {/* FIM AVATAR */}

                {/* {data?.avatar !== null ? (
                  <img
                    src={`${data?.avatar || "/imagens/default.png"}`}
                    sizes="56px"
                    alt="avatar"
                    //onError={() => setErroImagem(true)}
                    className="absolute rounded-full inset-0 h-full w-full object-cover object-center"
                  />
                ) : (
                  <p className="font-bold text-3xl">
                    {data?.nome.split("")[0]}
                  </p>
                )} */}
              </div>
              <div>
                <p className="text-xl font-medium">Editar Barbeiro</p>
                <p className="text-sm text-muted-foreground">
                  Gerencie as informações e configurações do profissional
                </p>
              </div>
            </CardHeader>
          </Card>
          {/* Inicio da TAB */}
          <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="gerais">
              <TabsList className="w-full text-muted-foreground bg-slate-50 gap-3">
                <TabsTrigger className="text-muted-foreground" value="gerais">
                  Dados Gerais
                </TabsTrigger>
                <TabsTrigger className="text-muted-foreground" value="servicos">
                  Serviços
                </TabsTrigger>
                <TabsTrigger
                  className="text-muted-foreground"
                  value="disponibilidade"
                >
                  Disponibilidades
                </TabsTrigger>
              </TabsList>
              <TabsContent value="gerais" className="space-y-3">
                <Card className="p-6">
                  <CardTitle className="pb-6">Informações Pessoais</CardTitle>
                  {/* formulario Edição */}
                  <div className="space-y-3">
                    <div className="flex-1 space-y-2">
                      <Label>Nome</Label>
                      <Input
                        type="text"
                        value={formData?.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="text"
                        value={formData?.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full md:flex gap-3">
                      <div className="space-y-3 w-full">
                        <Label>Data de Nascimento</Label>

                        <Input
                          type="date"
                          placeholder="dd/MM/aaaa"
                          value={formData?.data_nascimento}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              data_nascimento: e.target.value,
                            })
                          }
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="space-y-3 w-full">
                        <Label>Senha</Label>
                        <Input
                          type="text"
                          placeholder="********"
                          onChange={(e) =>
                            setFormData({ ...formData, senha: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                {/* <Card className="p-6">
                  <CardTitle>Comissão</CardTitle>
                  <CardDescription>
                    Digite o percentual (%) de comissão do barbeiro
                  </CardDescription>
                  <Input
                    type="number"
                    value={Number(formData.comissao) * 100}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comissao: Number(e.target.value) / 100,
                      })
                    }
                  />
                </Card> */}
                <Card className="p-6">
                  <CardTitle>Exclusão de Barbeiro</CardTitle>
                  <div className="flex items-center justify-between gap-3">
                    {data && data.ativo === false && (
                      <div className="flex w-full items-center justify-end">
                        <Button
                          type="button"
                          className="bg-green-600 hover:bg-green-500 w-[150px]"
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
                    {data && data.ativo === true && (
                      <div className="flex w-full items-center justify-end">
                        <Button
                          className="w-[150px]"
                          onClick={() => {
                            setOpenDialog(!openDialog);
                            setOpenModal(!openModal);
                          }}
                          variant={"destructive"}
                          type="button"
                        >
                          Excluir
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
              <DialogComponent
                className={`${
                  data?.ativo === false ? "bg-green-600 hover:bg-green-500" : ""
                }`}
                title={`Você deseja ${
                  data?.ativo === false ? "Ativar" : "excluir"
                } o barbeiro ${data?.nome}?`}
                actionLabel={`${data?.ativo === false ? "Ativar" : "Excluir"}`}
                open={openDialog}
                setOpen={setOpenDialog}
                action={
                  data?.ativo === true
                    ? () => handleDeleteBarbeiro(data!)
                    : () => handleReativarBarbeiro(data!)
                }
              />
              <TabsContent value="servicos">
                <Card className="p-6">
                  <CardTitle>Serviços Prestados</CardTitle>
                  <CardDescription>
                    Selecione os serviços que este barbeiro realiza
                  </CardDescription>
                  <div className=" md:grid md:grid-cols-2 md:gap-3 md:space-y-0 space-y-3">
                    {servicos?.map((serv) => (
                      <CardServico
                        key={serv?.id}
                        checked={Boolean(
                          formData.servicos?.some((s) => s.id === serv.id)
                        )}
                        id={Number(serv?.id)}
                        nome={serv?.nome ?? ""}
                        descricao={serv?.descricao ?? ""}
                        duracao={serv?.duracao ?? 0}
                        preco={serv?.preco ?? 0}
                        fnSelecionaServico={(novoChecked) =>
                          handleAdicionarServico(
                            formData.id,
                            Number(serv.id),
                            novoChecked
                          )
                        }
                      />
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="disponibilidade" className="space-y-3">
                <Card className="p-6">
                  <CardTitle className="">Status de Disponibilidade</CardTitle>
                  <CardDescription>
                    Configure se o barbeiro está aceitando agendamentos
                  </CardDescription>
                  <div className="border rounded-xl flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-3.5 ${
                          formData.disponivel === true
                            ? "bg-green-500"
                            : "bg-red-500"
                        }  rounded-full`}
                      />
                      <div className="">
                        <p className="font-semibold">
                          {formData.disponivel
                            ? "Disponível para agendamentos"
                            : "Indisponível para agendamentos"}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {formData.disponivel
                            ? "Este barbeiro pode receber novos agendamentos"
                            : "Este barbeiro não aparecerá nas opções de agendamento"}
                        </p>
                      </div>
                    </div>

                    <Switch
                      className=""
                      id="disponivel"
                      checked={formData.disponivel}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, disponivel: checked })
                      }
                    />
                  </div>
                </Card>
                <Card className="p-6">
                  <CardTitle>Fechamento de Horário</CardTitle>
                  <CardDescription>
                    Selecione um horario para ser fechado no agendamento
                  </CardDescription>
                  <div className="flex flex-col gap-3 md:flex-row items-center md:justify-evenly">
                    <div className="flex flex-col gap-2">
                      <Label>Início</Label>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="date"
                          className="w-[200px]"
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

                        <input
                          type="time"
                          value={inicioHora}
                          onChange={(e) => setInicioHora(e.target.value)}
                          className="border border-input rounded-md px-2 py-1 text-sm w-[200px] bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <Label>Fim</Label>
                        <Input
                          type="date"
                          className="w-[200px]"
                          placeholder="dd/MM/aaaa"
                          value={fimData ? format(fimData, "yyyy-MM-dd") : ""}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            const fimDataSelecionada = new Date(e.target.value);
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
                            className="border border-input rounded-md px-2 py-1 text-sm w-[200px] bg-background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <Button>Liberar Horário</Button> */}
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground">
                    💡 Dica: Quando um barbeiro está indisponível, ele não
                    aparecerá nas opções ao criar novos agendamentos, mas os
                    agendamentos já existentes serão mantidos.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Lado Menor */}
        <div className="lg:col-span-1 bg-card space-y-3 shadow rounded-lg">
          <div className="bg-gradient-to-br from-gray-200 to-gray-50 p-6 rounded-t-lg">
            <p className="text-lg font-semibold">Visão Geral do Perfil</p>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <div className="relative border-2 border-[#3f89c5]  rounded-full h-14 w-14 bg-slate-700 items-center justify-center flex text-white">
              {data?.avatar !== null ? (
                <img
                  src={`${data?.avatar || "/imagens/default.png"}`}
                  sizes="56px"
                  alt="avatar"
                  //onError={() => setErroImagem(true)}
                  className="absolute rounded-full inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <p className="font-bold text-3xl">{data?.nome.split("")[0]}</p>
              )}
            </div>

            <div className="w-full flex items-center flex-col">
              <p className="font-semibold">{data?.nome}</p>
              <p className="text-sm">
                {formData?.disponivel === true ? (
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="size-2 rounded-full bg-green-500"></p>{" "}
                    Disponível
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="size-2 rounded-full bg-red-500"></p>{" "}
                    Indisponível
                  </div>
                )}
              </p>
            </div>
          </div>
          <div className="border-b" />
          <div className="space-y-3">
            <div className="flex shadow-md items-center justify-between px-5 bg-slate-50 mx-5 rounded-sm py-3">
              <p className="flex items-center gap-3 text-sm font-semibold">
                <Star className="text-yellow-500" size={20} />
                Avaliação
              </p>
              <p className="text-sm font-semibold">4.8/5.0</p>
            </div>

            <div className="flex shadow-md items-center justify-between px-5 bg-slate-50 mx-5 rounded-sm py-3">
              <p className="flex items-center gap-3 text-sm font-semibold">
                <Award className="text-yellow-500" size={20} />
                Experiência
              </p>
              <p className="text-sm font-semibold">8 anos</p>
            </div>

            <div className="flex shadow-md items-center justify-between px-5 bg-slate-50 mx-5 rounded-sm py-3">
              <p className="flex items-center gap-3 text-sm font-semibold">
                <Calendar className="text-yellow-500" size={20} />
                Serviços
              </p>
              <p className="text-sm font-semibold">3</p>
            </div>
          </div>
          <div className="border-b" />
          <div className="px-5 space-y-3">
            <Label>Especializações</Label>
            <div className="flex flex-wrap gap-3">
              {data?.servicos?.map((servico) => (
                <Badge key={servico.id}>{servico.nome}</Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Barbeiros;
