import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AtualizarEmpresa } from "../controllers/configuracoes";
import { z } from "zod";
import { formSchemaEmpresa } from "../schemas/schemas";

type Empresa = z.infer<typeof formSchemaEmpresa>;

export const atualizarEmpresaMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, empresa }: { id: number; empresa: Empresa }) =>
      AtualizarEmpresa(id, empresa),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["empresas"] }),
    onError: (error) => console.error("Erro ao atualizar empresa", error),
  });
  return (id: number, empresa: Empresa) => mutation.mutate({ id, empresa });
};
