import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Form, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { POSTFuncionario } from "@/lib/api/funcionarios";
import { useForm as useFormReducer } from "@/contexts/AgendamentoContextProvider";
import { AgendamentoAction } from "@/contexts/AgendamentoReducer";
import { toast } from "sonner";

// type BarberFormProps = {
//   form: UseFormReturn<{
//     nome: string;
//     email: string;
//     senha: string;
//     data_nascimento: string;
//     disponivel: boolean;
//   }>;
// };

const formSchema = z.object({
  //id: z.coerce.number(),
  nome: z
    .string()
    .min(2, { message: "Nome deve conter no mínimo 2 caracteres" }),
  email: z.string().email("Email inválido"),
  senha: z.string().min(7, "A senha precisa conter no mínimo 7 caracteres"),
  data_nascimento: z
    .string()
    .min(10, "A data precisa estar no formato: dd/MM/aaaa"),
  // servico: z.array(z.any()).nullable(),
  disponivel: z.boolean(),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    //id: barbeiro.length + 1,
    nome: "",
    email: "",
    senha: "",
    data_nascimento: "",
    disponivel: true,
    // servico: [],
  },
});
export function BarberForm() {
  const onSubmit = async (barbeiro: z.infer<typeof formSchema>) => {
    const { dispatch } = useFormReducer();

    const response = await POSTFuncionario(
      barbeiro.nome,
      barbeiro.email,
      barbeiro.senha,
      barbeiro.data_nascimento,
      barbeiro.disponivel
    );

    dispatch({
      type: AgendamentoAction.setBarbeiro,
      payload: [response.data],
    });

    if (response.status === 201) {
      toast.success("Barbeiro cadastrado com sucesso!");
    } else if (response.status === 400) {
      toast.error("Erro na requisição! Verifique os dados");
    } else {
      toast.error("Oops, ocorreu um erro!");
    }

    // setOpenModal(false);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do barbeiro" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="Digite aqui..." {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="data_nascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="dd/MM/aaaa"
                        {...field}
                        maxLength={10}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
