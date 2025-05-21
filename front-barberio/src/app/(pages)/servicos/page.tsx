"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/lib/baseUrl";
import { Servico } from "@/types/servico";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Scissors } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const servicos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico>();

  const query = useQuery({
    queryKey: ["servicos"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/servico`);
      setServicos(response.data);
      return response.data;
    },
  });

  const queryClient = useQueryClient();

  const abrirModal = () => {
    setServicoSelecionado(undefined);
    form.reset({
      nome: "",
      descricao: "",
      duracao: 0,
      preco: 0,
    });
    setOpenModal(true);
  };
  const fechaModal = () => {
    form.reset();
    setOpenModal(false);
  };
  const formSchema = z.object({
    nome: z.string().min(2, {
      message: "Serviço deve conter no mínimo 5 caracteres",
    }),
    descricao: z.string().min(2, {
      message: "Descrição deve conter no mínimo 5 caracteres",
    }),
    duracao: z.number().positive({ message: "Duração deve ser positivo" }),
    preco: z.number().positive({ message: "Valor deve ser positivo" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      duracao: 0,
      preco: 0,
    },
  });
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      if (servicoSelecionado) {
        const response = await axios.put(
          `${baseUrl}/servico/${servicoSelecionado.id}`,
          {
            nome: value.nome,
            descricao: value.descricao,
            duracao: value.duracao,
            preco: value.preco,
          }
        );
      } else {
        const response = await axios.post(`${baseUrl}/servico`, {
          nome: value.nome,
          descricao: value.descricao,
          duracao: value.duracao,
          preco: value.preco,
        });

        console.log(response);
      }
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }

    console.log(value);
    //setRender(!render);
    setServicoSelecionado(undefined);
    form.reset();
    setOpenModal(false);
  };
  const deleteServico = async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/servico/${id}`);

      console.log(`Serviço ${servicoSelecionado} foi excluido com sucesso`);

      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Serviços</p>
          <p className="text-slate-500">
            Gerencie os serviços oferecidos pela barbearia
          </p>
        </div>
        <Button onClick={abrirModal}>
          <Scissors />
          Novo Serviço
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {servicos
          .sort((a, b) => Number(b.id) - Number(a.id))
          .map((servico) => (
            <Card className="p-5" key={servico.id}>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">{servico.nome}</p>
                <p className="texto-azul text-2xl font-semibold">
                  {servico.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div>
                <p className="text-slate-500">{servico.descricao}</p>
                <p>
                  <span className="font-semibold">Duração:</span>{" "}
                  {servico.duracao} minutos
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setServicoSelecionado(servico);
                    form.reset({
                      nome: servico.nome,
                      descricao: servico.descricao,
                      duracao: servico.duracao,
                      preco: servico.preco,
                    });
                    setOpenModal(true);
                  }}
                  variant="secondary"
                  type="button"
                  className="border rounded-sm bg-slate-50 hover:bg-slate-100 cursor-pointer"
                >
                  Editar
                </Button>
              </div>
            </Card>
          ))}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {servicoSelecionado
                  ? "Editar Serviço"
                  : "Cadastrar Novo Serviço"}
              </DialogTitle>
              <DialogDescription>
                Preencha todos os dados abaixo
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome:</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do serviço" {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Descrição do serviço"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="duracao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração (min)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="30"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0,00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-5">
                  {servicoSelecionado && (
                    <Button
                      type="button"
                      onClick={() => deleteServico(servicoSelecionado.id)}
                      variant="destructive"
                    >
                      Excluir
                    </Button>
                  )}
                  <Button onClick={fechaModal} variant={"ghost"} type="button">
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {servicoSelecionado ? "Salvar" : "Cadastrar"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default servicos;
