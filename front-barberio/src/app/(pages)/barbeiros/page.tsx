"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { barbeiro } from "../../../model/barbeiro";
import { Card } from "@/components/ui/card";
import { servicos } from "@/model/servico";
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
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Barbeiro } from "@/types/barbeiro";

const barbeiros = () => {
  const [openModal, setOpenModal] = useState(false);
  const [barbeiroLista, setBabeiroLista] = useState<Barbeiro[]>(barbeiro);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro>();
  const formSchema = z.object({
    id: z.string(),
    nome: z
      .string()
      .min(2, { message: "Nome deve conter no mínimo 2 Caracteres" }),
    servico: z.array(z.string()).min(1, "Selecione pelo menos um serviço"),
    isDisponivel: z.boolean(),
    avatar: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: String(barbeiro.length + 1),
      nome: "",
      avatar: "",
      isDisponivel: true,
      servico: [],
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    const barbeiroExistente = barbeiroSelecionado;

    const barbeiroAtualizado: Barbeiro = {
      id: value.id,
      nome: value.nome,
      servicos: value.servico,
      isDisponivel: value.isDisponivel,
      avatar: value.avatar,
    };
    if (barbeiroExistente) {
      setBabeiroLista((prev) =>
        prev.map((barber) =>
          barber.id === barbeiroAtualizado.id ? barbeiroAtualizado : barber
        )
      );
    } else {
      setBabeiroLista((prev) => [...prev, barbeiroAtualizado]);
    }
    setBarbeiroSelecionado(undefined);
    console.log(barbeiroAtualizado);
    setOpenModal(false);
    form.reset();
  };
  const abrirModal = () => {
    setOpenModal(true);
    form.reset({
      id: String(barbeiro.length + 1),
      nome: "",
      avatar: "",
      isDisponivel: true,
      servico: [],
    });
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
              <div className="border rounded-full h-14 w-14 bg-slate-700 items-center justify-center flex text-white">
                <img
                  className="object-cover rounded-full border-2 border-slate-100 h-14 w-14"
                  src={barbeiro.avatar}
                />
              </div>
              <div>
                <p className="font-bold text-slate-100">{barbeiro.nome}</p>
                <p
                  className={`font-semibold
                    ${
                      barbeiro.isDisponivel ? "text-green-300" : "text-red-400"
                    }`}
                >
                  {barbeiro.isDisponivel ? "Disponível" : "Indisponível"}
                </p>
              </div>
            </div>
            <div className="px-3">
              <p className="text-sm font-semibold">Serviços:</p>
              <span className="">
                {barbeiro.servicos
                  .map((id) => servicos.find((s) => s.id === id)?.nome)
                  .filter(Boolean)
                  .map((nome, index) => (
                    <span
                      key={index}
                      className="ml-3 bg-slate-100 rounded-sm text-slate-400 text-xs px-2 py-0.5"
                    >
                      {nome}
                    </span>
                  ))}
              </span>
            </div>
            <div className="w-full px-3 py-3 flex justify-between items-center">
              <Button
                onClick={() => {
                  setBarbeiroSelecionado(barbeiro);
                  form.reset({
                    id: barbeiro.id,
                    nome: barbeiro.nome,
                    avatar: barbeiro.avatar,
                    isDisponivel: barbeiro.isDisponivel,
                    servico: barbeiro.servicos,
                  });
                  setOpenModal(true);
                }}
                className="bg-slate-700 hover:bg-slate-600"
              >
                Gerenciar
              </Button>
              <div className="flex gap-3">
                <Switch id="disponivel" checked={barbeiro.isDisponivel} />
                <Label htmlFor="disponivel" className="font-normal">
                  {barbeiro.isDisponivel ? "Disponível" : "Indisponível"}
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de Barbeiro</DialogTitle>
            <DialogDescription>
              preencha todos os dados necessários
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
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar (Url da imagem):</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://exemplo.com/imagem.jpg"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
              />
              <FormField
                control={form.control}
                name="isDisponivel"
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
                  variant={"ghost"}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default barbeiros;
