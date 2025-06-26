import { TitulosPages } from "@/components/layout/titulosPages";

const agendamentos = () => {
  return (
    <div className="w-screen h-screen flex px-10 py-5 bg-[#e6f0ff]">
      <TitulosPages
        Titulos="Agendamentos"
        subtitulo="Gerencie os agendamentos da barbearia"
      ></TitulosPages>
    </div>
  );
};
export default agendamentos;
