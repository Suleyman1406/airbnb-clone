import { Nunito } from "next/font/google";
import Navbar from "../layout/navbar";
import RegisterModal from "../layout/modals/register";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "../layout/modals/login";
import getCurrentUser from "../actions/getCurrentUser";
import RentModal from "../layout/modals/rent";
import ClientOnly from "../components/client-only";
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
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
