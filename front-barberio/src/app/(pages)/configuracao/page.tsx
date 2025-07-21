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
import { Building2, Calendar, Clock, Edit, Plus, Trash2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { formSchemaConfiguracao, formSchemaFeriado } from "./schemas/schemas";
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
import { Feriados } from "./models/feriados";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";

const configuracao = () => {
  const [feriadosGeral, _setFeriadosGeral] =
    useState<z.infer<typeof formSchemaFeriado>[]>(Feriados);
  const [dadosEmpresa, setDadosEmpresa] =
    useState<z.infer<typeof formSchemaConfiguracao>>();

  useQuery<z.infer<typeof formSchemaConfiguracao>>({
    queryKey: ["empresas"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/empresas/1`);
      setDadosEmpresa(response.data);
      console.log(response.data);
      return response.data;
    },
    staleTime: 5 * (60 * 1000),
  });

  const checkCEP = (e: { target: { value: any } }) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);

    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.erro) {
            form.setValue("endereco.rua", data.logradouro || "");
            form.setValue("endereco.bairro", data.bairro || "");
            form.setValue("endereco.cidade", data.localidade || "");
            form.setFocus("endereco.numero");
            //form.setValue("complemento", data.complemento || "");
            //form.setValue("uf", data.uf.toLowerCase() || "");
          } else {
            toast.info("CEP Inválido!");
          }
        });
    } else {
      toast.info("CEP Inválido!");
    }
  };

  const form = useForm<z.infer<typeof formSchemaConfiguracao>>({
    resolver: zodResolver(formSchemaConfiguracao),
    defaultValues: {},
  });

  const statusHorarios = useWatch({
    control: form.control,
    name: "config.horarios",
  });

  useEffect(() => {
    if (dadosEmpresa) {
      form.reset({
        ...dadosEmpresa,
        endereco: dadosEmpresa.endereco,
        config: dadosEmpresa.config,
      });
    }
  }, [dadosEmpresa]);

  const formFeriado = useForm<z.infer<typeof formSchemaFeriado>>({
    resolver: zodResolver(formSchemaFeriado),
  });

  //const atualizarEmpresa = atualizarEmpresaMutation();

  const onSubmitConfiguracao = (
    values: z.infer<typeof formSchemaConfiguracao>
  ) => {
    console.log(values);
    //  const empresa = values.empresa;

    // if (!empresa || typeof empresa.id !== "number") {
    //   toast.error("Empresa Invalida ou sem ID.");
    //   return;
    // }

    //    atualizarEmpresa(empresa.id, empresa);

    toast.info("verifique o console log!");
    console.log(values);
  };

  const adicionarFeriado = (values: z.infer<typeof formSchemaFeriado>) => {
    toast.info("verifique o console log!");
    console.log(values);
  };

  const deleteFeriado = (feriado: z.infer<typeof formSchemaFeriado>) => {
    toast.info("verifique o console log!");
    console.log("Deletando Feriado: ", feriado);
  };

  const editFeriado = (feriado: z.infer<typeof formSchemaFeriado>) => {
    toast.info("verifique o console log!");
    console.log("Deletando Feriado: ", feriado);
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
                            <Input
                              placeholder="BarberIO"
                              {...field}
                              value={field.value ?? ""}
                            />
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
                    <FormField
                      control={form.control}
                      name="endereco.cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="01234-567"
                              {...field}
                              value={field.value ?? ""}
                              onBlur={(e) => {
                                field.onBlur();
                                checkCEP(e);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
                            checked={field.value ?? true}
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
                  {dadosEmpresa?.config?.horarios
                    ?.sort((a, b) => a.id! - b.id!)
                    .map((horario, index) => {
                      const status = statusHorarios?.[index]?.aberto;

                      return (
                        <Card
                          key={horario.id}
                          className="p-3 min-h-24 justify-center"
                        >
                          <div className="flex gap-4 items-center">
                            <div className="min-w-[150px] flex items-center">
                              <FormField
                                key={horario.id}
                                control={form.control}
                                name={`config.horarios.${index}.aberto`}
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
                            {status === true ? (
                              <>
                                <FormField
                                  control={form.control}
                                  name={`config.horarios.${index}.abertura`}
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
                                  name={`config.horarios.${index}.fechamento`}
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
                              </>
                            ) : (
                              <p className="font-semibold text-xl text-slate-700">
                                Fechado
                              </p>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                </Card>
              </TabsContent>
            </form>
          </Form>
          <TabsContent value="feriado">
            {/* Aqui será colocado o conteudo da tab Feriado */}
            <Card className="min-h-[250px] p-4">
              <TitulosCards
                Titulos="Feriados"
                subtitulo="Configure feriado em que a barbearia não funcionará"
              />
              <Card className="p-4 w-full gap-4">
                <Form {...formFeriado}>
                  <form
                    id="formFeriado"
                    onSubmit={formFeriado.handleSubmit(adicionarFeriado)}
                    className="gap-5 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-5">
                      <FormField
                        control={formFeriado.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Nome do Feriado</FormLabel>
                            <FormControl>
                              <Input
                                className="w-[250px]"
                                placeholder="Feriado de Natal"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formFeriado.control}
                        name="data"
                        render={({ field }) => (
                          <FormItem className="min-w-20">
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <Input
                                className="w-[250px]"
                                type="date"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formFeriado.control}
                        name="recorrente"
                        render={({ field }) => (
                          <FormItem className="flex gap-4">
                            <FormControl>
                              <Switch
                                className=""
                                checked={field.value ?? false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Recorrente</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button form="formFeriado">
                      <Plus /> Adicionar
                    </Button>
                  </form>
                </Form>
              </Card>
              <p className="font-semibold text-sm pt-4">Feriados Cadastrado</p>
              {feriadosGeral.map((feriado) => (
                <Card
                  key={feriado.id}
                  className="min-h-16 flex-row justify-between items-center p-4"
                >
                  <div className="flex gap-4">
                    <p className="font-bold">{feriado.nome}</p>
                    <p className="text-slate-500">{feriado.data}</p>
                    <Badge className="bg-primary/20 text-primary">
                      {feriado.recorrente ? "Recorrente" : ""}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <div
                      onClick={() => deleteFeriado(feriado)}
                      className="hover:bg-red-600 flex items-center justify-center w-8 h-8 rounded-sm text-red-100 bg-red-400 cursor-pointer transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </div>
                    <div
                      onClick={() => editFeriado(feriado)}
                      className="hover:bg-slate-800 flex items-center justify-center w-8 h-8 rounded-sm text-slate-100 bg-slate-600 cursor-pointer transition-all duration-300"
                    >
                      <Edit size={18} />
                    </div>
                  </div>
                </Card>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default configuracao;
