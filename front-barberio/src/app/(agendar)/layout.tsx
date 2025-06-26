import type { Metadata } from "next";
import "../globals.css";
import { AgendamentoProvider } from "@/contexts/AgendamentoContextProvider";
import { Toaster } from "sonner";
import { Providers } from "@/utils/providers";
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
      <body className={`antialiased bg-[#e6f0ff] min-h-screen`}>
        <div className="p-5 lg:p-0 md:p-0 ">
          <Providers>
            <Toaster richColors position="top-center" />
            <AgendamentoProvider>{children}</AgendamentoProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
