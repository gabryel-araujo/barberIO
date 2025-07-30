"use client";
import Image from "next/image";

import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchemaUser } from "./components/formSchemaUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  // const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaUser>>({
    resolver: zodResolver(formSchemaUser),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    try {
      // const res =
      await axios.post("", {
        email: values.email,
        senha: values.senha,
      });
      console.log("✅ Login sucesso:", values);
      // router.replace("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "❌ erro no Login: ",
        error.response?.data || error.message
      );
    }
    console.log(values);
  };

  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center gap-3 p-8">
        <p className="mb-8 text-slate-600/50">
          {/* <Image
            src="/logo-wfinance.png"
            width={173}
            height={39}
            alt="Wfinance"
          /> */}
        </p>
        <h1 className="mb-3 text-4xl font-bold text-slate-700">Bem-Vindo</h1>
        <p className="mb-3 text-muted-foreground">
          O BarberIO foi criado para facilitar o seu dia a dia, oferecendo
          praticidade, agilidade e controle total sobre o seu negócio.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-white p-10 rounded-lg shadow-lg border"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" variant={"outline"}>
              <LogInIcon className="mr-2" /> Fazer Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/LoginPage.jpg"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default LoginPage;
