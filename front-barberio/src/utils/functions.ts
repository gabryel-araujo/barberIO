export function formatarTelefone(telefone: string): string {
  // Remove tudo que não é número
  const numeros = telefone.replace(/\D/g, "");

  // Aplica o padrão (99) 99999-9999
  return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export function normalizarData(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}
