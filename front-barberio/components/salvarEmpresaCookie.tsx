import { getEmpresaIdFromHref, validarToken } from "@/utils/functions";
import { useEffect } from "react";

export function SalvarEmpresaCookie() {
  useEffect(() => {
    let empresaId;

    const token = validarToken();
    if (token) {
      empresaId = token.empresa_id;
    } else {
      empresaId = getEmpresaIdFromHref();
    }
    if (empresaId) {
      document.cookie = `ref=${empresaId}; path=/; max-age=31536000`;
    }
  }, []);
  return null;
}
