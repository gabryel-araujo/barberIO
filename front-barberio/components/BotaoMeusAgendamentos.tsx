import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { findByTelefone } from "@/lib/api/cliente";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const BotaoMeusAgendamentos = () => {
  const clienteLogado = Cookies.get("telefoneCliente");
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const chegarCliente = async (telefone: string | undefined) => {
    if (telefone?.length! >= 11) {
      //função de consultar o telefone
      const findCliente = await findByTelefone(telefone as string);
      if (findCliente.length === 0) {
        toast.error(
          "Cliente não encontrado na base de dados, verifique o número"
        );
        setOpenModal(false);
      } else {
        Cookies.set("telefoneCliente", findCliente[0].telefone);
        router.refresh();
        setOpenModal(false);
      }
    } else {
      toast.error("Número inválido, digite no mínimo 11 números");
    }
  };

  return (
    <>
      {!clienteLogado && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="rounded-sm bg-green-700 hover:bg-green-600 h-12 w-60">
              <p className="text-lg">Meus Agendamentos</p>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p className="font-semibold">Confirme sua identidade</p>
              </DialogTitle>
              <DialogDescription>
                vamos confirmar sua identidade, para isso preencha os dados
                abaixo solicitado.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">
                Digite seu número de telefone:
              </p>
              <Input
                ref={telefoneRef}
                placeholder="digite seu numero"
                type="number"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button className="bg-red-700 hover:bg-red-600">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  chegarCliente(telefoneRef.current?.value);
                }}
                className="bg-green-700 hover:bg-green-600"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
