import { Nunito } from "next/font/google";
import Navbar from "@/app/layout/navbar";
import RegisterModal from "@/app/layout/modals/register";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/layout/modals/login";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/layout/modals/rent";
import ClientOnly from "@/app/components/client-only";
import SearchModal from "@/app/layout/modals/search";
import "../globals.css";

export const metadata = {
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
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
