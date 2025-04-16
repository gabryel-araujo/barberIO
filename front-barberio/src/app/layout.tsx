import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
    <GoogleOAuthProvider clientId="390689734986-hqeuloo6ah4eboq90j4sq0kasem6hvos.apps.googleusercontent.com">
      <html lang="pt-BR">
        <body className={`antialiased`}>{children}</body>
      </html>
    </GoogleOAuthProvider>
  );
}
