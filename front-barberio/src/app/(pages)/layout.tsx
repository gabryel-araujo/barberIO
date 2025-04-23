import type { Metadata } from "next";
import "../globals.css";
import { LayoutResponsivo } from "@/components/layout/layoutResponsivo";

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
        <LayoutResponsivo>{children}</LayoutResponsivo>
      </body>
    </html>
  );
}
