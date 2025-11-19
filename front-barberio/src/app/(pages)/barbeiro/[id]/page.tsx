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
import { GETUmFuncionario } from "@/lib/api/funcionarios";
import { GETServicos } from "@/lib/api/servico";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardServico } from "../components/cardServico";
import { toast } from "sonner";
import { Barbeiro } from "@/types/barbeiro";

const Barbeiros = () => {
  const params = useParams();
  const idBarbeiro = String(params.id);

  const { data } = useQuery({
    queryKey: ["barbeiro", idBarbeiro],
    queryFn: () => GETUmFuncionario(idBarbeiro),
  });

  const { data: servicos } = useQuery({
    queryKey: ["servicos"],
    queryFn: () => GETServicos(),
  });

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
      });
    }
  }, [data]);

  return (
    <div className="w-full px-6 py-6 space-y-6 bg-[#e6f0ff]">
      <aside className="sticky top-0 z-10  backdrop-blur-md supports-[backdrop-filter]:bg-[#e6f0ff]/60 p-6 flex md:flex-row items-center justify-between gap-3 md:px-10">
        <div className="flex items-center gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
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
          <Button>Salvar alterações</Button>
        </div>
      </aside>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lado Maior */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-row p-6">
            <CardHeader className="flex md:flex-row items-center gap-6">
              <div className="relative border-2 border-[#3f89c5] rounded-full h-20 w-20 bg-slate-700 items-center justify-center flex text-white">
                {data?.avatar !== null ? (
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
                )}
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
              <TabsContent value="gerais">
                <Card className="p-6">
                  <CardTitle className="pb-6">Informações Pessoais</CardTitle>
                  {/* formulario Edição */}
                  <div className="space-y-3">
                    <div className="space-y-2">
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
                          type="text"
                          value={formData?.data_nascimento}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              data_nascimento: e.target.value,
                            })
                          }
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
              </TabsContent>
              <TabsContent value="servicos">
                <Card className="p-6">
                  <CardTitle>Serviços Prestados</CardTitle>
                  <CardDescription>
                    Selecione os serviços que este barbeiro realiza
                  </CardDescription>
                  <div className=" md:grid md:grid-cols-2 md:gap-3 md:space-y-0 space-y-3">
                    {servicos?.map((servico) => (
                      <CardServico
                        key={servico?.id}
                        checked={Boolean(
                          formData?.servicos?.includes(String(servico.id))
                        )}
                        id={Number(servico?.id)}
                        nome={servico?.nome ?? ""}
                        descricao={servico?.descricao ?? ""}
                        duracao={servico?.duracao ?? 0}
                        preco={servico?.preco ?? 0}
                        fnSelecionaServico={() =>
                          toast.warning("teste de seleção")
                        }
                      />
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="disponibilidade">
                <Card className="p-6">
                  <CardTitle className="pb-6">
                    Status de Disponibilidade
                  </CardTitle>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Lado Menor */}
        <div className="lg:col-span-1 bg-card space-y-3 shadow rounded-lg">
          <div className="bg-gray-300 p-6 rounded-t-lg">
            <p className="text-lg font-semibold">Preview do Perfil</p>
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
                {data?.disponivel === true ? (
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
        </div>
      </main>
    </div>
  );
};

export default Barbeiros;
