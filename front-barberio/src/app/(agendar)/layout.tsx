import type { Metadata } from "next";
import "@/app/globals.css";
import { AgendamentoProvider } from "@/contexts/AgendamentoContextProvider";
import { Toaster } from "sonner";
import { Providers } from "@/utils/providers";
export const metadata: Metadata = {
  title: "BaberIO",
  description: "BarberIO seu agendamento da melhor forma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased bg-[#e6f0ff] min-h-screen`}>
        <div className="p-5 min-h-full flex flex-col lg:p-0 md:p-0 ">
          <Providers>
            <Toaster richColors position="top-center" />
            <AgendamentoProvider>{children}</AgendamentoProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
