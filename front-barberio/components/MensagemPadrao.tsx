import Cookies from "js-cookie";

export const MensagemPadrao = () => {
  const clienteLogado = Cookies.get("telefoneCliente");
  return (
    <>
      {!clienteLogado && (
        <div className="bg-white border rounded-lg p-6">
          <p className="text-2xl text-center font-semibold">Nossos Serviços</p>
          <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-5 pt-3">
            <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
              <p className="font-semibold text-lg">Corte de Cabelo</p>
              <span className="text-slate-400">
                Estilo personalizado para seu tipo de cabelo
              </span>
            </div>
            <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
              <p className="font-semibold text-lg">Barba</p>
              <span className="text-slate-400">
                Modelagem e tratamento completo
              </span>
            </div>
            <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
              <p className="font-semibold text-lg">Combo (Cabelo + Barba)</p>
              <span className="text-slate-400">
                Pacote completo com preço especial
              </span>
            </div>
            <div className="bg-[#f3f4f6]/30 rounded-sm p-5">
              <p className="font-semibold text-lg">Tratamentos Especiais</p>
              <span className="text-slate-400">
                Hidratação, relaxamento e mais
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
