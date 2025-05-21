import type { Metadata } from "next";
import "../globals.css";
import { LayoutResponsivo } from "@/components/layout/layoutResponsivo";
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
      <body className={`antialiased`}>
        <AgendamentoProvider>
          <Providers>
            <Toaster richColors position="top-right" duration={3000} />
            <LayoutResponsivo>{children}</LayoutResponsivo>
          </Providers>
        </AgendamentoProvider>
      </body>
    </html>
  );
}
