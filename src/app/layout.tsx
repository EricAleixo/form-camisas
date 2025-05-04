import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Escolha sua camisa - Formulário para a escolha a camisa dos 3° Info B",
  description: "APP simples de formulário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="overflow-x-hidden">
        <Header/>
        {children}
      </body>
    </html>
  );
}
