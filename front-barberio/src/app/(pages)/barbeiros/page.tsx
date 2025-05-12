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

const barbeiros = () => {
  const [openModal, setOpenModal] = useState(false);

  const formSchema = z.object({
    id: z.string(),
    nome: z.string(),
    servico: z.string().array(),
    isDisponivel: z.boolean(),
    avatar: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      nome: "",
      avatar:
        "https://faculdadeeleven.com.br/wp-content/uploads/2023/10/fotos2-2022-05-12-01-54-02-p.jpg",
      isDisponivel: true,
      servico: ["1"],
    },
  });

  const onSubmit = () => {
    alert("BORA CACHORRADAAAAA");
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
        <Button onClick={() => setOpenModal(!openModal)}>
          <UserPlus />
          Novo Barbeiro
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-5 px-5">
        {barbeiro.map((barbeiro) => (
          <Card className="" key={barbeiro.id}>
            <div className="rounded-t-md p-3 bg-slate-800 flex justify-start items-center gap-3">
              <div className="border rounded-full h-14 w-14 bg-slate-700 items-center justify-center flex text-white">
                <img
                  className="rounded-full border-2 border-slate-100"
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
              <Button className="bg-slate-700 hover:bg-slate-600">
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input placeholder="digite seu nome" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default barbeiros;
