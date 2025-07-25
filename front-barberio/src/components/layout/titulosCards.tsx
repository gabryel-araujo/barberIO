type TitulosCardsProps = {
  Titulos: string;
  subtitulo?: string;
};

export const TitulosCards = ({ Titulos, subtitulo }: TitulosCardsProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-semibold">{Titulos}</p>
      <p className="text-slate-500 text-sm">{subtitulo}</p>
    </div>
  );
};
