import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  AtualizaEndereco,
  AtualizarConfigEmpresa,
  AtualizarEmpresa,
} from "../controllers/configuracoes";
import {
  configEmpresaSchema,
  empresaSchema,
  enderecoSchema,
} from "../schemas/schemas";

type Empresa = z.infer<typeof empresaSchema>;
type Endereco = z.infer<typeof enderecoSchema>;
type ConfigEMpresa = z.infer<typeof configEmpresaSchema>;

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

  const mutationAtualizaConfigEmpresa = useMutation({
    mutationFn: ({
      config_id,
      empresa_id,
      config_empresa,
    }: {
      config_id: number;
      empresa_id: number;
      config_empresa: ConfigEMpresa;
    }) => AtualizarConfigEmpresa(config_id, empresa_id, config_empresa),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar ConfigEmpresa", error);
    },
  });
  return {
    mutationAtualizarEmpresa,
    mutationAtualizaEndereco,
    mutationAtualizaConfigEmpresa,
  };
};
