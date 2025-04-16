"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getFuncionarios, setGoogleFuncionario } from "@/lib/api/funcionarios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleLoginProps,
} from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface GooglePayload {
  given_name: string;
  family_name: string;
  email: string;
  jti: string;
  exp: number;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSendApi(e: React.FormEvent) {
    const oneHour = 60 * 60 * 1000;
    e.preventDefault();
    try {
      const response = await getFuncionarios(email, password);
      if (response) {
        toast.success("Redirecionando...");
        localStorage.setItem(
          "auth-token",
          JSON.stringify({
            token: response.token,
            expiresIn: new Date().getTime() + oneHour,
          })
        );
        setTimeout(() => {
          router.replace("/home");
        }, 1000);
      }
    } catch (errorLogin) {
      toast.error("Erro ao fazer login");
      console.error(errorLogin);
    }
  }

  async function handleGoogleLogin(decodedData: GooglePayload) {
    let userName = `${decodedData.given_name} ${decodedData.family_name}`;
    try {
      const response = await setGoogleFuncionario(userName, decodedData.email);
      if (response) {
        toast.success("Redirecionando...");
        localStorage.setItem(
          "auth-token",
          JSON.stringify({
            token: decodedData.jti,
            expiresIn: decodedData.exp * 1000,
          })
        );

        setTimeout(() => {
          router.replace("/home");
        }, 1000);
      }
    } catch (errorLogin) {
      toast.error("Erro ao fazer login");
      console.error(errorLogin);
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSendApi}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem-vindo!</h1>
                  <p className="text-balance text-muted-foreground">
                    Faça login no Barber.io
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Faça login com:
                  </span>
                </div>
                <div className="flex justify-center gap-4">
                  <GoogleLogin
                    onSuccess={(credentialResponse: CredentialResponse) => {
                      if (credentialResponse.credential) {
                        const decoded = jwtDecode<GooglePayload>(
                          credentialResponse.credential
                        );
                        handleGoogleLogin(decoded);
                      }
                    }}
                    onError={() => {
                      toast.error("Falha no login!");
                    }}
                  />
                </div>
                <div className="text-center text-sm">
                  Não possui uma conta?{" "}
                  <a
                    onClick={() => {
                      router.replace("/register");
                    }}
                    className="underline underline-offset-4"
                  >
                    Registre-se
                  </a>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="/logo.jpeg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale pr-4"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Ao clicar em continuar, você concorda com nossos{" "}
          <a href="#">Termos de serviço</a> e{" "}
          <a href="#">Política de Privacidade</a>.
        </div>
      </div>
    </>
  );
}
