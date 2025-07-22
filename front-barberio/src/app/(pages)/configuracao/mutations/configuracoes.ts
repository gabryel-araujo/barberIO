import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  AtualizaEndereco,
  AtualizarEmpresa,
} from "../controllers/configuracoes";
import { empresaSchema, enderecoSchema } from "../schemas/schemas";

type Empresa = z.infer<typeof empresaSchema>;
type Endereco = z.infer<typeof enderecoSchema>;

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

  const mutationAtualizaEndereco = useMutation({
    mutationFn: ({ id, endereco }: { id: number; endereco: Endereco }) =>
      AtualizaEndereco(id, endereco),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar endereço", error);
    },
  });

  return {
    mutationAtualizarEmpresa,
    mutationAtualizaEndereco,
  };
};
