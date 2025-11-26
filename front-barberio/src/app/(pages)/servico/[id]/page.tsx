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
import { GETUmServico } from "@/lib/api/servico";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Award, Calendar, Scissors, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Servico } from "@/types/servico";
import { CardServico } from "@/app/(agendar)/agendar/components/cardServicos";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import Cookies from "js-cookie";

const Barbeiros = () => {
  const params = useParams();
  const idServico = String(params.id);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["servico", idServico],
    queryFn: () => GETUmServico(idServico),
  });

  // const { data: servicos } = useQuery({
  //   queryKey: ["servicos"],
  //   queryFn: () => GETServicos(),
  // });

  const [formData, setFormData] = useState<Servico>({
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    duracao: 0,
    ativo: false,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        nome: data.nome || "",
        descricao: data.descricao || "",
        preco: data.preco || 0,
        duracao: data.duracao || 0,
        ativo: data.ativo || false,
      });
    }
  }, [data]);

  // async function handleAdicionarServico(
  //   idBarbeiro: number,
  //   idServico: number,
  //   checked: boolean
  // ) {
  //   try {
  //     setFormData((prev) => {
  //       const servicosAtuais = prev.servicos ?? [];

  //       if (checked) {
  //         // → ADICIONAR SERVIÇO
  //         const servicoCompleto = servicos?.find((s) => s.id === idServico);
  //         if (!servicoCompleto) return prev;

  //         return {
  //           ...prev,
  //           servicos: [...servicosAtuais, servicoCompleto],
  //         };
  //       }

  //       // → REMOVER SERVIÇO
  //       return {
  //         ...prev,
  //         servicos: servicosAtuais.filter((s) => s.id !== idServico),
  //       };
  //     });
  //     if (checked) {
  //       await adicionarServico(idBarbeiro, idServico);
  //       toast.success("Serviço Adicionado com sucesso!");
  //     } else {
  //       await removerServico(idBarbeiro, idServico);
  //       toast.success("Serviço Removido com sucesso!");
  //     }
  //     queryClient.invalidateQueries({
  //       queryKey: ["barbeiro", idBarbeiro],
  //     });
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // }
  async function salvarBarbeiro() {
    await axios
      .put(
        `${baseUrl}/servico/${idServico}`,
        {
          nome: formData.nome,
          descricao: formData.descricao,
          duracao: formData.duracao,
          preco: formData.preco,
          ativo: formData.ativo,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then(() => {
        toast.success("Serviço atualizado com sucesso!");
        router.push("/servicos");
      });
  }
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
                  <Link href="/servicos">Serviços</Link>
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
          <Button onClick={salvarBarbeiro}>Salvar alterações</Button>
        </div>
      </aside>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lado Maior */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-row p-6">
            <CardHeader className="flex md:flex-row items-center gap-6">
              <div className="relative border-2 border-[#3f89c5] rounded-full h-20 w-20 bg-slate-700 items-center justify-center flex text-white">
                <Scissors />
              </div>
              <div>
                <p className="text-xl font-medium">Editar Serviço</p>
                <p className="text-sm text-muted-foreground">
                  Gerencie as informações e configurações do serviço
                </p>
              </div>
            </CardHeader>
          </Card>
          {/* Inicio da TAB */}
          <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="gerais">
              <TabsContent value="gerais" className="space-y-3">
                <Card className="p-6">
                  <CardTitle className="pb-6">Informações Gerais</CardTitle>
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
                      <Label>Descrição</Label>
                      <Input
                        type="text"
                        value={formData?.descricao}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descricao: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-full md:flex gap-3">
                      <div className="space-y-3 w-full">
                        <Label>Duração</Label>
                        <Input
                          type="number"
                          value={formData?.duracao}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duracao: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-3 w-full">
                        <Label>Preço R$</Label>
                        <Input
                          type="number"
                          value={formData?.preco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preco: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="border rounded-xl flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-3.5 ${
                            formData.ativo === true
                              ? "bg-green-500"
                              : "bg-red-500"
                          }  rounded-full`}
                        />
                        <div className="">
                          <p className="font-semibold">
                            {formData.ativo
                              ? "Serviço Ativo"
                              : "Serviço Inativo"}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {formData.ativo
                              ? "Este serviço pode receber novos agendamentos"
                              : "Este serviço não aparecerá nas opções de agendamento"}
                          </p>
                        </div>
                      </div>

                      <Switch
                        className=""
                        id="disponivel"
                        checked={formData.ativo}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, ativo: checked })
                        }
                      />
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
                    {/* {servicos?.map((serv) => (
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
                    ))} */}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Lado Menor */}
        <div className="lg:col-span-1 bg-card space-y-3 shadow rounded-lg">
          <div className="bg-gradient-to-br from-gray-200 to-gray-50 p-6 rounded-t-lg">
            <p className="text-lg font-semibold">Visão geral do serviço</p>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <div className="relative border-2 border-[#3f89c5] rounded-full h-20 w-20 bg-slate-700 items-center justify-center flex text-white">
              <Scissors />
            </div>

            <div className="w-full flex items-center flex-col">
              <p className="font-semibold text-lg">{data?.nome}</p>
              {/* todo: verificar essa div dentro do P */}
              <p className="text-sm">
                {formData?.ativo === true ? (
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="size-2 rounded-full bg-green-500"></p> Ativo
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="size-2 rounded-full bg-red-500"></p> Inativo
                  </div>
                )}
              </p>
            </div>
          </div>
          <div className="border-b" />
          <div className="space-y-3 px-5">
            <p className="font-bold">Preview do card</p>
            <CardServico
              descricao={formData.descricao!}
              duracao={formData.duracao!}
              nome={formData.nome}
              valor={formData.preco}
              selecionado
            />
          </div>
          <div className="border-b" />
          {/* <div className="px-5 space-y-3">
            <Label>Especializações</Label>
            <div className="flex gap-3">
              {servicos?.map((servico) => (
                <Badge key={servico.id}>{servico.nome}</Badge>
              ))}
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Barbeiros;
