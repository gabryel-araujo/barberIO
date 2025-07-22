// src/lib/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AtualizarEmpresa } from "../controllers/configuracoes";
import { empresaSchema } from "../schemas/schemas";

type Empresa = z.infer<typeof empresaSchema>;

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutationAtualizarEmpresa = useMutation({
    mutationFn: ({ id, empresa }: { id: number; empresa: Empresa }) =>
      AtualizarEmpresa(id, empresa),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar empresa", error);
    },
  });

  return {
    mutationAtualizarEmpresa,
  };
};
