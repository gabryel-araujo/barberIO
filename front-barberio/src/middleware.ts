import { NextRequest, NextResponse } from "next/server";
import { validarTokenServer } from "./utils/functions";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const tokenValidado = validarTokenServer(token);
  const path = request.nextUrl.pathname;
  const rotasApenasDev = ["/administracao"];

  if (!token) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  console.log("token:", tokenValidado);
  if (rotasApenasDev.some((r) => path.startsWith(r))) {
    try {
      if (tokenValidado?.role !== "DEV") {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/clientes",
    "/configuracao",
    "/servicos",
    "/barbeiros",
    "/dashboard",
    "/agendamentos",
    "/administracao",
  ],
};
