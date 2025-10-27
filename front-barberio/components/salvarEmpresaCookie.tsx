import { getEmpresaIdFromHref } from "@/utils/functions";
import { useEffect } from "react";

export function SalvarEmpresaCookie() {
  useEffect(() => {
    const empresaId = getEmpresaIdFromHref();
    if (empresaId) {
      document.cookie = `ref=${empresaId}; path=/; max-age=31536000`;
    }
  }, []);
  return null;
}
