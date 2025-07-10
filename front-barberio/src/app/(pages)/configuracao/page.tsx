"use client";
import { TitulosCards } from "@/components/layout/titulosCards";
import { TitulosPages } from "@/components/layout/titulosPages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchemaEmpresa } from "./schemas/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const configuracao = () => {
  const form = useForm<z.infer<typeof formSchemaEmpresa>>({
    resolver: zodResolver(formSchemaEmpresa),
    defaultValues: {
      email: "",
      nome: "",
      telefone: "",
    },
  });

  const onSubmitEmpresa = (values: z.infer<typeof formSchemaEmpresa>) => {
    console.log(values);
  };
  return (
    <div className="w-screen min-h-screen bg-[#e6f0ff]">
      <div className="w-full flex justify-between items-center md:px-10 px-3 py-5">
        <TitulosPages
          Titulos="Configurações"
          subtitulo="Gerencie as configurações da sua barbearia"
        />

        <Button form="formBarbearia">Salvar Alterações</Button>
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
          <TabsContent value="geral" className="space-y-4">
            {/* Aqui será colocado o conteudo da tab Geral */}
            <Card className="min-h-[250px] p-4 space-y-4">
              <TitulosCards
                Titulos="Informações da Barbearia"
                subtitulo="Configure as informações básicas do seu estabelecimento"
              />

              <Form {...form}>
                <form
                  id="formBarbearia"
                  onSubmit={form.handleSubmit(onSubmitEmpresa)}
                  className="grid grid-cols-2 gap-5"
                >
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Barbearia</FormLabel>
                        <FormControl>
                          <Input placeholder="BarberIO" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(83) 99999-9999" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nacional_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000/0000-00" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contato@barberio.com"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </Card>
            <Card className="p-4">
              <TitulosCards
                Titulos="Endereço"
                subtitulo="Informações de localização da barbearia"
              />
            </Card>
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
