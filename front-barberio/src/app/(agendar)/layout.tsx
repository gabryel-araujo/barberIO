import type { Metadata } from "next";
import "../globals.css";
import { AgendamentoProvider } from "@/contexts/AgendamentoContextProvider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "BaberIO",
  description: "BarberIO seu agendamento da melhor forma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased bg-[#f3f4f6]`}>
        <div className="p-5">
          <Toaster richColors position="top-center" />
          <AgendamentoProvider>{children}</AgendamentoProvider>
        </div>
      </body>
    </html>
  );
}
