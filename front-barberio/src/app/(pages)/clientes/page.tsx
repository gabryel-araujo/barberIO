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
import { Search, UserPlus } from "lucide-react";

const clientes = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-10 py-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Clientes</p>
          <p className="text-slate-500">Gerencie os clientes da barbearia.</p>
        </div>
        <Button>
          <UserPlus />
          Novo Cliente
        </Button>
      </div>
      <div className="relative flex-1 max-w-sm px-10">
        <Search className="absolute left-12 top-2.5 h-4 w-4 text-slate-500 " />
        <Input
          placeholder="Buscar clientes..."
          className="pl-8 text-slate-500"
        />
      </div>
      <div className="px-10 py-5">
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
            <TableRow>
              <TableCell>Renato</TableCell>
              <TableCell>83988332659</TableCell>
              <TableCell>renatowillon@hotmail.com</TableCell>
              <TableCell>08/05/2025</TableCell>
              <TableCell>Detalhe</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default clientes;
