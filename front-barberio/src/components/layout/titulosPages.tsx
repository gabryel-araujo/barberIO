type TitulosPagesProps = {
  Titulos: string;
  subtitulo?: string;
};

export const TitulosPages = ({ Titulos, subtitulo }: TitulosPagesProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold">{Titulos}</p>
      <p className="text-slate-500">{subtitulo}</p>
    </div>
  );
};
