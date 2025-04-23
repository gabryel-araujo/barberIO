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
        <div className="flex">
          <Sidebar />
          <div className="flex flex-1 bg-[#f3f4f6]">{children}</div>
        </div>
      </body>
    </html>
  );
}
