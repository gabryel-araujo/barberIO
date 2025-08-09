"use client";
import { LogInIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchemaUser } from "./components/formSchemaUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaUser>>({
    resolver: zodResolver(formSchemaUser),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    form.formState.isSubmitting && toast.info("Fazendo Login...");
    try {
      const response = await axios.post(
        "http://137.131.135.29:1509/auth/login",
        {
          email: values.email,
          senha: values.senha,
        }
      );

      const token = response.data.token;
      Cookies.set("authToken", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      form.formState.isSubmitted &&
        toast.success("Login realizado com sucesso!");
      router.replace("/");
    } catch (error: any) {
      console.error(
        "❌ erro no Login: ",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f0ff] flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <img
                src="/web-app-manifest-192x192.png"
                className="rounded-full"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent mb-3">
              Bem-Vindo ao BarberIO
            </h1>
            <p className="text-blue-900 text-lg leading-relaxed">
              Criado para facilitar o seu dia a dia, oferecendo praticidade,
              agilidade e controle total sobre o seu negócio.
            </p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="block text-sm font-medium text-blue-400 mb-2 transition-colors">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Digite seu email"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/60 rounded-md text-blue-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="block text-sm font-medium text-blue-400 mb-2 transition-colors">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="*********"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/60 rounded-md text-blue-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden border-0 h-auto"
                  disabled={form.formState.isSubmitting}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  <LogInIcon
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                  <span>
                    {form.formState.isSubmitting
                      ? "Entrando..."
                      : "Fazer Login"}
                  </span>
                </Button>

                {/* Form Errors */}
                {(form.formState.errors.email ||
                  form.formState.errors.senha) && (
                  <div className="text-red-400 text-sm text-center">
                    {form.formState.errors.email?.message ||
                      form.formState.errors.senha?.message}
                  </div>
                )}

                {/* Forgot Password */}
                {/* <div className="text-center">
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-300 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div> */}
              </form>
            </Form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
              >
                Cadastre-se aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
