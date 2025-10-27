import type { Metadata } from "next";
import "@/app/globals.css";
import { LayoutResponsivo } from "@/components/layout/layoutResponsivo";
import { AgendamentoProvider } from "@/contexts/AgendamentoContextProvider";
import { Toaster } from "sonner";
import { Providers } from "@/utils/providers";
import RegisterServiceWorker from "../../../components/RegisterServiceWorker";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`antialiased`}>
        <RegisterServiceWorker />
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
