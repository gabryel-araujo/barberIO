import type { Metadata } from "next";
import "../globals.css";
import { AgendamentoProvider } from "@/contexts/AgendamentoContext";
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
      <body className={`antialiased`}>
        <div className="flex-1 h-screen bg-[#f3f4f6]">
          <AgendamentoProvider>{children}</AgendamentoProvider>
        </div>
      </body>
    </html>
  );
}
