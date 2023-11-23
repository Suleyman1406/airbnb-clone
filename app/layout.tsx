import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./layout/navbar";
import RegisterModal from "./layout/modals/register";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./layout/modals/login";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Dadabnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
