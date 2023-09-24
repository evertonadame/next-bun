import Header from "@/components/header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "./provider";
import ModalLogin from "@/components/login/ModalLogin";
import AuthProvider from "@/components/authProvider";
import ModalCreate from "@/components/create/modalCreate";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ReduxProvider>
          <AuthProvider />
          <Header />
          {children}
          <ModalLogin />
          <ModalCreate />
        </ReduxProvider>
      </body>
    </html>
  );
}
