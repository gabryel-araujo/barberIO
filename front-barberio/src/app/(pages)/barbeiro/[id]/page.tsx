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
import { Card, CardHeader } from "@/components/ui/card";

import { GETUmFuncionario } from "@/lib/api/funcionarios";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import { useParams } from "next/navigation";

const Barbeiro = () => {
  const params = useParams();
  const idBarbeiro = String(params.id);

  const { data } = useQuery({
    queryKey: ["barbeiro", idBarbeiro],
    queryFn: () => GETUmFuncionario(idBarbeiro),
  });

  return (
    <div className="w-full px-6 py-6 space-y-6 ">
      <aside className="sticky top-0 z-10 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b p-6 flex items-center justify-between gap-3 px-10">
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

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="flex flex-row p-6">
            <CardHeader>
              <div className="relative border-2 border-[#3f89c5] rounded-full h-14 w-14 bg-slate-700 items-center justify-center flex text-white">
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
        </div>
        <div className="lg:col-span-1 space-y-3">
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

export default Barbeiro;
