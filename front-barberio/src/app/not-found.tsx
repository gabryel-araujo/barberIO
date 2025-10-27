"use client";
import Link from "next/link";
import "@/app/globals.css";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  <img src="/vibrante.png" alt="Logo BarberIO Vibrante" />
                </h2>
                <p className="text-sm text-center text-muted-foreground">
                  Software para barbearias, simples, rápido e com estilo.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-gradient-to-b from-gray-50 to-white border border-gray-100">
              <h3 className="text-lg font-bold text-slate-800">
                Ops — página não encontrada
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                A barbearia procurada parece ter saído para cortar o cabelo. Mas
                relaxa, a gente te leva de volta.
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/home"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white hover:brightness-95 transition"
                >
                  <ArrowLeft size={16} /> Voltar ao painel
                </Link>

                <a
                  href="mailto:suporte@barberio.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 text-slate-800 hover:bg-slate-50 transition"
                >
                  <Mail size={16} /> Contatar suporte
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              <p>
                Se você entrou via link de convite, peça ao administrador para
                reenviar ou confirmar o código da barbearia.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-8xl md:text-9xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r  from-[#575BEA] via-[#3184E7] to-[#08B0E5]">
              404
            </h1>
            <p className="mt-2 text-xl md:text-2xl font-semibold text-slate-700">
              Página não encontrada
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href="/"
                className="px-5 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-medium hover:bg-slate-900 hover:text-white transition"
              >
                Ir para Painel
              </Link>
              <Link
                href="/agendar"
                className="px-5 py-3 rounded-full bg-primary text-white font-medium hover:brightness-95 transition"
              >
                Ver Barbearias
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              {/* Small decorative barber poles */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Procure pela barbearia ou peça reenvio do link
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">Código: 0xBARB404</p>
          </div>
        </motion.div>
      </div>

      {/* small footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">
        <span>© {new Date().getFullYear()} BarberIO</span>
      </div>
    </main>
  );
}
