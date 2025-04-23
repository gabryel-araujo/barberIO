import type { Metadata } from "next";
import "../globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileNavbar";

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
