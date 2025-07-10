import { TitulosPages } from "@/components/layout/titulosPages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calendar, Clock } from "lucide-react";

const configuracao = () => {
  return (
    <div className="w-screen min-h-screen bg-[#e6f0ff]">
      <div className="w-full flex justify-between items-center md:px-10 px-3 py-5">
        <TitulosPages
          Titulos="Configurações"
          subtitulo="Gerencie as configurações da sua barbearia"
        />

        <Button>Salvar Alterações</Button>
      </div>
      {/* tabs de configurações */}
      <div className="md:px-10">
        <Tabs defaultValue="geral">
          <TabsList className="bg-[#e6f0ff] w-full h-11 gap-3">
            <TabsTrigger value="geral">
              <Building2 /> Geral
            </TabsTrigger>
            <TabsTrigger value="horario">
              <Clock /> Horário
            </TabsTrigger>
            <TabsTrigger value="feriado">
              <Calendar /> Feriado
            </TabsTrigger>
          </TabsList>
          <TabsContent value="geral">
            {/* Aqui será colocado o conteudo da tab Geral */}
            <Card className="min-h-[250px] p-4">Geral</Card>
          </TabsContent>
          <TabsContent value="horario">
            {/* Aqui será colocado o conteudo da tab Horario */}
            <Card className="min-h-[250px] p-4">Horário</Card>
          </TabsContent>
          <TabsContent value="feriado">
            {/* Aqui será colocado o conteudo da tab Feriado */}
            <Card className="min-h-[250px] p-4">Feriado</Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default configuracao;
