"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Edit2, Search, UserPlus } from "lucide-react";
import { Clientes } from "@/model/clientes";
import { Cliente } from "@/types/cliente";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatarTelefone } from "@/utils/functions";
const clientes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clienteListado, setClienteListado] = useState<Cliente[]>(Clientes);
  const [pesquisaInput, setPesquisaInput] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente>();

  //função para pegar o que ta escrito no input pesquisa
  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisaInput(e.target.value);
  };

  //filtrando os clientes com base no que ta escrito no input pesquisa
  const filtroCliente = clienteListado.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(pesquisaInput.toLowerCase()) ||
      cliente.telefone.includes(pesquisaInput) ||
      cliente.email.toLowerCase().includes(pesquisaInput.toLowerCase())
  );

  //mostrar os dados do cliente selecionado
  const handleClienteDados = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    console.log("Cliente Selecionado:", cliente);
  };

  const formShema = z.object({
    id: z.string(),
    nome: z
      .string({ required_error: "Digite seu nome" })
      .min(2, { message: "Nome precisa ter no minimo 2 caracteres" })
      .max(120, { message: "Nome precisa ter no maximo 120 caracteres" }),
    telefone: z
      .string({ required_error: "Digite seu telefone" })
      .min(11, { message: "Nome precisa ter no minimo 11 caracteres" }),
    email: z
      .string({ required_error: "Email Inválido" })
      .email({ message: "Email Inválido" }),
    dataCadastro: z.date(),
  });

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      id: String(clienteListado.length + 1),
      nome: "",
      telefone: "",
      email: "",
      dataCadastro: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof formShema>) => {
    //primeiro pega os dados do novoCliente
    const novoCliente: Cliente = {
      id: values.id,
      nome: values.nome,
      email: values.email,
      telefone: values.telefone,
      dataCadastro: new Date(values.dataCadastro),
    };
    //agora seta o novo cliente nos clientes
    setClienteListado((prev) => [...prev, novoCliente]);

    //logs
    console.log("Novo Cliente:", novoCliente);
    console.log(values);
    //fecha modal
    setOpenModal(!openModal);
  };

  const abrirModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Clientes</p>
          <p className="text-slate-500">Gerencie os clientes da barbearia.</p>
        </div>
        <Button onClick={abrirModal}>
          <UserPlus />
          Novo Cliente
        </Button>
      </div>
      <div className="relative flex-1 max-w-sm px-10">
        <Search className="absolute left-12 top-2.5 h-4 w-4 text-slate-500 " />
        <Input
          value={pesquisaInput}
          onChange={handlePesquisa}
          placeholder="Buscar clientes..."
          className="pl-8 text-slate-500"
        />
      </div>
      <div className="px-10 py-5 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtroCliente.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{formatarTelefone(cliente.telefone)}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>
                  {cliente.dataCadastro.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleClienteDados(cliente)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de Cliente</DialogTitle>
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
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="digite seu nome" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="digite seu telefone"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ""))
                        }
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="digite seu email" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-5 flex gap-5">
                <Button
                  onClick={() => setOpenModal(!openModal)}
                  variant="destructive"
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
export default clientes;
