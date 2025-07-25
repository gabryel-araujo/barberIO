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
import { Edit, Filter, Search, UserPlus } from "lucide-react";
import { Cliente } from "@/types/cliente";
import { useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { toast } from "sonner";
import { DialogComponent } from "@/components/layout/DialogComponent";
import { formatarTelefone, nomeCapitalizado } from "@/utils/functions";
import { whatsapp } from "@/lib/whstsapp";
import Link from "next/link";
import { Whatsapp } from "../../../../components/Whatsapp";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ConversaoData } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const clientes = () => {
  const [openModal, setOpenModal] = useState(false);
  //const [clienteListado, setClienteListado] = useState<Cliente[]>([]);
  const [pesquisaInput, setPesquisaInput] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente>();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [exibirInativos, setExibirInativos] = useState(false);

  //função para pegar o que ta escrito no input pesquisa
  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisaInput(e.target.value);
  };

  const queryClient = useQueryClient();

  const { data: clienteListado = [] } = useQuery({
    queryKey: ["clientes", exibirInativos],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/clientes`);
      const clientes = response.data;
      const clientesFiltrado = exibirInativos
        ? clientes
        : clientes.filter((clientes: Cliente) => clientes.ativo === true);
      return clientesFiltrado;
    },
    staleTime: 5 * (60 * 1000),
  });

  //filtrando os clientes com base no que ta escrito no input pesquisa
  const filtroCliente = clienteListado.filter(
    (cliente: Cliente) =>
      cliente.nome.toLowerCase().includes(pesquisaInput.toLowerCase()) ||
      cliente.telefone.includes(pesquisaInput) ||
      cliente.id?.toString().includes(pesquisaInput)
  );
  // variaveis para controle de paginação
  const [nomesPorPagina, setNomesPorPagina] = useState(10);
  const [page, setPage] = useState(1);
  const range = 1;
  const totalPages = Math.ceil(filtroCliente.length / nomesPorPagina);
  const inicio = (page - 1) * nomesPorPagina;
  const fim = inicio + nomesPorPagina;
  const inicioPagina = Math.max(1, page - range);
  const fimPagina = Math.min(totalPages, page + range);
  const paginasParaMostrar = [];
  for (let i = inicioPagina; i <= fimPagina; i++) {
    paginasParaMostrar.push(i);
  }

  //mostrar os dados do cliente selecionado
  const handleClienteDados = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    console.log("Cliente Selecionado:", cliente);
  };

  const formShema = z.object({
    nome: z
      .string({ required_error: "Digite seu nome" })
      .regex(/^[a-zA-ZáàâãäéèêëíìîïóòôõöúùûüçÇ\s]*$/, {
        message: "O campo deve conter apenas letras.",
      })
      .min(2, { message: "Nome precisa ter no minimo 2 caracteres" })
      .max(120, { message: "Nome precisa ter no maximo 120 caracteres" }),
    telefone: z
      .string({ required_error: "Digite seu telefone" })
      .regex(/^\d{11}$/, "Telefone inválido, digite no formato XX XXXXX XXXX")
      .min(11, { message: "Nome precisa ter no minimo 11 caracteres" }),
  });

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      nome: "",
      telefone: "",
    },
  });

  const onSubmit = async (values: Cliente) => {
    console.log("onSubmit Chamando com: ", values);

    try {
      const clienteExistente = clienteSelecionado;
      //primeiro pega os dados do novoCliente
      const clienteAtualizado: Cliente = {
        ...clienteExistente,
        id: clienteExistente?.id, // será opcional para tirar.
        nome: nomeCapitalizado(values.nome),
        telefone: values.telefone,
        ativo: clienteExistente?.ativo,
      };
      if (clienteExistente) {
        console.log("Verificando campos:", clienteExistente, clienteAtualizado);
        // se for cliente atualiza o cliente na lista
        await axios.put(
          `${baseUrl}/clientes/${clienteExistente.id}`,
          clienteAtualizado
        );
        console.log("Cliente Salvo:", clienteAtualizado);
        toast.success("Cliente alterado com sucesso!");
      } else {
        //agora seta o novo cliente nos clientes
        await axios.post(`${baseUrl}/clientes`, clienteAtualizado);
        console.log("Cliente Novo:", clienteAtualizado);
        toast.success("Cliente cadastrado com sucesso!");
      }
      await queryClient.invalidateQueries({ queryKey: ["clientes"] });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }

    //logs
    console.log(values);
    //fecha modal
    setOpenModal(false);
    //limpaModal
    setClienteSelecionado(undefined);
    form.reset();
  };

  const abrirModal = () => {
    form.reset({
      nome: "",
      telefone: "",
    });
    setClienteSelecionado(undefined);
    setOpenModal(!openModal);
  };

  const deleteCliente = async (value: Cliente) => {
    try {
      console.log(`Deletando: ${baseUrl}/clientes/${value.id}`);
      await axios.put(`${baseUrl}/clientes/${value.id}`, {
        ...value,
        nome: nomeCapitalizado(value.nome),
        telefone: value.telefone,
        ativo: false,
      });

      await queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente deletado com sucesso!");
    } catch (error) {
      console.error("Erro deletando cliente:", error);
      toast.error("Ops ocorreu um erro!");
    }

    setOpenModalDelete(false);
  };

  const reativarCliente = async (value: Cliente) => {
    try {
      console.log(`Deletando: ${baseUrl}/clientes/${value.id}`);
      await axios.put(`${baseUrl}/clientes/${value.id}`, {
        ...value,
        nome: nomeCapitalizado(value.nome),
        telefone: value.telefone,
        ativo: true,
      });

      await queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente Ativado com sucesso!");
    } catch (error) {
      console.error("Erro Ativando cliente:", error);
      toast.error("Ops ocorreu um erro!");
    }

    setOpenModalDelete(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#e6f0ff]">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Clientes</p>
          <p className="text-slate-500">Gerencie os clientes da barbearia</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={abrirModal}>
            <UserPlus />
            Novo Cliente
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
      <div className="relative flex-1 max-w-sm px-10">
        <Search className="absolute left-12 top-2.5 h-4 w-4 text-slate-500 " />
        <Input
          value={pesquisaInput}
          onChange={handlePesquisa}
          placeholder="Buscar clientes..."
          className="pl-8 text-slate-500"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden m-5 p-3">
        <Table className="">
          <TableHeader>
            <TableRow className="overflow-hidden">
              {/* <TableHead>ID</TableHead> */}
              <TableHead className="rounded-tl-2xl px-4 py-3 text-start">
                Nome
              </TableHead>
              <TableHead className="px-4 py-3">Telefone</TableHead>
              <TableHead className="text-center px-4 py-3">
                Data de Cadastro
              </TableHead>
              <TableHead className="text-end px-6 py-3 rounded-tr-2xl">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtroCliente
              .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
              .slice(inicio, fim)
              .map((cliente: Cliente) => (
                <TableRow
                  key={cliente.id}
                  className="hover:bg-gray-50 transition-colors duration-300 border-b last:border-none"
                >
                  {/* <TableCell>{cliente.id}</TableCell> */}
                  <TableCell className="flex gap-3 px-4">
                    <p>{cliente.nome}</p>
                    <p>
                      {cliente.ativo === false && (
                        <Badge className="bg-red-500">Inativo</Badge>
                      )}
                    </p>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex w-full justify-center">
                      <Link
                        className="flex gap-3 max-w-[150px] "
                        target="_blank"
                        href={`${whatsapp}${cliente.telefone}`}
                      >
                        <Badge
                          variant="default"
                          className="group w-full items-center justify-center flex min-w-[150px] py-1 hover:bg-green-600 font-semibold hover:font-semibold hover:text-white transition-all duration-400"
                        >
                          {/* <div className="flex items-center justify-center gap-2"> */}
                          <p className="flex items-center justify-center">
                            {formatarTelefone(cliente.telefone)}
                          </p>

                          <div className="group-hover:animate-bounce group-hover:fill-green-200 fill-green-100">
                            <Whatsapp height={15} width={15} />
                          </div>
                          {/* </div> */}
                        </Badge>
                      </Link>
                    </div>
                  </TableCell>

                  <TableCell className="text-center px-4">
                    {ConversaoData(cliente.created_at)}
                  </TableCell>
                  <TableCell className="flex justify-end px-4">
                    <Button
                      className=""
                      onClick={() => {
                        handleClienteDados(cliente);
                        form.reset({
                          // id: cliente.id,
                          nome: cliente.nome,
                          telefone: cliente.telefone,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* incio de paginação */}
        <div className="py-3 text-sm flex items-center justify-between px-5 text-slate-600">
          <div className="flex items-center gap-2">
            <div>Mostrar:</div>
            <div>
              <Select
                value={nomesPorPagina.toString()}
                onValueChange={(value) => setNomesPorPagina(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue defaultChecked></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>de registros: {filtroCliente.length}</div>
          </div>
          <div>
            <Pagination className="">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : " cursor-pointer"
                    }
                  ></PaginationPrevious>
                </PaginationItem>
                {paginasParaMostrar.map((numero) => (
                  <PaginationItem key={numero} className="cursor-pointer">
                    <PaginationLink
                      onClick={() => setPage(numero)}
                      isActive={numero === page}
                    >
                      {numero}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) => Math.max(prev + 1, totalPages))
                    }
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  ></PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {clienteSelecionado
                ? "Alteração de cliente"
                : "Cadastro de Cliente"}
            </DialogTitle>
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

              <div className="pt-5 flex justify-between gap-5">
                {clienteSelecionado && clienteSelecionado.ativo === false && (
                  <div>
                    <Button
                      type="button"
                      className="bg-green-600 hover:bg-green-500"
                      variant="default"
                      onClick={() => {
                        setOpenModalDelete(true);
                        setOpenModal(false);
                      }}
                    >
                      Ativar
                    </Button>
                  </div>
                )}
                {clienteSelecionado && clienteSelecionado.ativo === true && (
                  <div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        setOpenModalDelete(true);
                        setOpenModal(false);
                      }}
                    >
                      Deletar
                    </Button>
                  </div>
                )}
                <div className="flex gap-5">
                  <Button
                    type="button"
                    onClick={() => setOpenModal(!openModal)}
                    variant="ghost"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {clienteSelecionado ? "Salvar" : "Cadastrar"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DialogComponent
        className={`${
          clienteSelecionado?.ativo === false
            ? "bg-green-600 hover:bg-green-500"
            : ""
        }`}
        actionLabel={`${
          clienteSelecionado?.ativo === false ? "Ativar" : "Excluir"
        }`}
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={`Deseja realmente ${
          clienteSelecionado?.ativo === false ? "ativar" : "apagar"
        } o cliente ${clienteSelecionado?.nome}?`}
        action={
          clienteSelecionado?.ativo === true
            ? () => deleteCliente(clienteSelecionado!)
            : () => reativarCliente(clienteSelecionado!)
        }
      />
    </div>
  );
};
export default clientes;
