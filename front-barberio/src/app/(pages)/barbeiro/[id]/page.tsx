"use client";

import { GETUmFuncionario } from "@/lib/api/funcionarios";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";

const Barbeiro = () => {
  const params = useParams();
  const idBarbeiro = String(params.id);

  const { data } = useQuery({
    queryKey: ["barbeiro", idBarbeiro],
    queryFn: () => GETUmFuncionario(idBarbeiro),
  });

  return (
    <div>
      <p>{data?.nome}</p>
    </div>
  );
};

export default Barbeiro;
