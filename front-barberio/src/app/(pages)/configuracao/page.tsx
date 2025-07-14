"use client";
import { TitulosCards } from "@/components/layout/titulosCards";
import { TitulosPages } from "@/components/layout/titulosPages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchemaConfiguracao } from "./schemas/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Horarios } from "./models/horarios";

const configuracao = () => {
  const form = useForm<z.infer<typeof formSchemaConfiguracao>>({
    resolver: zodResolver(formSchemaConfiguracao),
    defaultValues: {
      horario: Horarios,
    },
  });

  const onSubmitConfiguracao = (
    values: z.infer<typeof formSchemaConfiguracao>
  ) => {
    console.log(values);
  };

  return (
    <div className="w-screen min-h-screen bg-[#e6f0ff]">
      <div className="w-full flex justify-between items-center md:px-10 px-3 py-5">
        <TitulosPages
          Titulos="Configurações"
          subtitulo="Gerencie as configurações da sua barbearia"
        />

        <Button form="formConfiguracao">Salvar Alterações</Button>
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
          {/* inicio do form */}
          <Form {...form}>
            <form
              id="formConfiguracao"
              onSubmit={form.handleSubmit(onSubmitConfiguracao)}
              className="gap-5"
            >
              <TabsContent value="geral" className="space-y-4 pb-4">
                {/* Aqui será colocado o conteudo da tab Geral */}
                <Card className="min-h-[250px] p-4 space-y-4">
                  <TitulosCards
                    Titulos="Informações da Barbearia"
                    subtitulo="Configure as informações básicas do seu estabelecimento"
                  />
                  <div className=" grid grid-cols-2 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="empresa.nome"
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
                      name="empresa.telefone"
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
                      name="empresa.nacional_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="00.000.000/0000-00"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="empresa.email"
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
                  </div>
                </Card>
                <Card className="min-h-[250px] p-4 space-y-4">
                  <TitulosCards
                    Titulos="Endereço"
                    subtitulo="Informações de localização da barbearia"
                  />
                  {/* inicio de form Endereço */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="endereco.rua"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rua</FormLabel>
                            <FormControl>
                              <Input placeholder="Rua das Flores" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="endereco.numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endereco.bairro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Centro" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endereco.cidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="João Pessoa" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endereco.cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input placeholder="01234-567" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
                <Card className="p-4">
                  <TitulosCards
                    Titulos="Status de Funcionamento"
                    subtitulo="Controle se a barbearia está aberta para agendamentos"
                  />
                  <FormField
                    control={form.control}
                    name="config.aberto"
                    render={({ field }) => (
                      <FormItem className="flex gap-4">
                        <FormControl>
                          <Switch
                            className=""
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          Barbearia Aberta para agendamentos
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="horario" className="space-y-4 pb-4">
                {/* Aqui será colocado o conteudo da tab Horario */}
                <Card className="min-h-[250px] p-4 space-y-4">
                  <TitulosCards
                    Titulos="Intervalo de Atendimento"
                    subtitulo="Defina o intervalo entre agendamentos (afeta todos os horários disponíveis)"
                  />
                  <FormField
                    control={form.control}
                    name="config.intervalo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o intervalo</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={String(field.value)}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="w-[180px] py-2 my-2">
                              <SelectValue placeholder="Selecione o tempo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="15">15 minutos </SelectItem>
                                <SelectItem value="30">30 minutos </SelectItem>
                                <SelectItem value="45">45 minutos </SelectItem>
                                <SelectItem value="1">1 hora </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Intervalo atual: {field.value} minutos
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </Card>
                <Card className="min-h-[250px] p-4 space-y-4">
                  <TitulosCards
                    Titulos="Horários de Funcionamento"
                    subtitulo="Configure os horários de funcionamento para cada dia da semana"
                  />
                  {Horarios.map((horario, index) => (
                    <Card key={horario.id} className="p-3">
                      {/* Campo invisível para manter o ID */}
                      {/* <input
                        type="hidden"
                        {...form.register(`horario.${index}.id`)}
                        value={horario.id}
                      /> */}
                      {/* Campo invisível para manter o nome do dia */}
                      {/* <input
                        type="hidden"
                        {...form.register(`horario.${index}.nome`)}
                        value={horario.nome}
                      /> */}
                      <div className="flex gap-4 items-center">
                        <div className="min-w-[150px] flex items-center">
                          <FormField
                            key={horario.id}
                            control={form.control}
                            name={`horario.${index}.status`}
                            render={({ field }) => (
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <Switch
                                    className=""
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>{horario.nome}</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name={`horario.${index}.abertura`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Abertura</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder=""
                                  type="time"
                                  ///step={2}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`horario.${index}.fechamento`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fechamento</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder=""
                                  type="time"
                                  ///step={2}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </Card>
              </TabsContent>
              <TabsContent value="feriado">
                {/* Aqui será colocado o conteudo da tab Feriado */}
                <Card className="min-h-[250px] p-4">Feriado</Card>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};
export default configuracao;
