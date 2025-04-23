import type { Metadata } from "next";
import "../globals.css";

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
        <div className="flex-1 h-screen bg-[#f3f4f6]">{children}</div>
      </body>
    </html>
  );
}
