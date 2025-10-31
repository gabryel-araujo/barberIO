import { Mail, MapPin, Phone } from "lucide-react";

interface BannerHomeProps {
  imagemBarbaria: string;
  nomeBarbearia: string;
  ruaBarbearia: string;
  numeroBarbearia: string;
  bairroBarbearia: string;
  cidadeBarbearia: string;
  telefoneBarbearia: string;
  emailBarbearia: string;
}

export const BannerHome = ({
  imagemBarbaria,
  nomeBarbearia,
  telefoneBarbearia,
  emailBarbearia,
  bairroBarbearia,

  numeroBarbearia,
  ruaBarbearia,
}: BannerHomeProps) => {
  return (
    <div className="overflow-hidden w-full lg:min-w-4xl rounded-md md:mt-10 border-0 shadow-lg">
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src={imagemBarbaria}
          alt={nomeBarbearia}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {nomeBarbearia}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {ruaBarbearia}, {numeroBarbearia} - {bairroBarbearia}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{telefoneBarbearia}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{emailBarbearia}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
