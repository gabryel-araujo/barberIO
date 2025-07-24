import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  AtualizaEndereco,
  AtualizarConfigEmpresa,
  AtualizarEmpresa,
  CriarFeriado,
  DeletarFeriado,
  EditarFeriado,
} from "../controllers/configuracoes";
import {
  configEmpresaSchema,
  empresaSchema,
  enderecoSchema,
  formSchemaFeriado,
} from "../schemas/schemas";

type Empresa = z.infer<typeof empresaSchema>;
type Endereco = z.infer<typeof enderecoSchema>;
type ConfigEMpresa = z.infer<typeof configEmpresaSchema>;
type Feriado = z.infer<typeof formSchemaFeriado>;

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

  const mutationCriarFeriado = useMutation({
    mutationFn: ({
      config_id,
      feriados,
    }: {
      config_id: number;
      feriados: Feriado;
    }) => CriarFeriado(config_id, feriados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
    onError: (error) => {
      console.error("Erro ao criar Feriado", error);
    },
  });

  const mutationEditarFeriado = useMutation({
    mutationFn: ({ id, feriados }: { id: number; feriados: Feriado }) =>
      EditarFeriado(id, feriados),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["empresas"] }),
    onError: (error) => {
      console.error("Erro ao editar feriado", error);
    },
  });

  const mutationDeletarFeriado = useMutation({
    mutationFn: ({ id }: { id: number }) => DeletarFeriado(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["empresas"] }),
    onError: (error) => {
      console.error("Erro ao deletar feriado", error);
    },
  });

  return {
    mutationAtualizarEmpresa,
    mutationAtualizaEndereco,
    mutationAtualizaConfigEmpresa,
    mutationCriarFeriado,
    mutationEditarFeriado,
    mutationDeletarFeriado,
  };
};
