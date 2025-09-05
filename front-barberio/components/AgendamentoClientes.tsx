import Cookies from "js-cookie";
export const AgendamentoClientes = () => {
  const clienteLogado = Cookies.get("telefoneCliente");
  return (
    <>
      {clienteLogado && (
        <div className="bg-white border rounded-lg p-6">
          <p>Agendamento Clientes.</p>
        </div>
      )}
    </>
  );
};
