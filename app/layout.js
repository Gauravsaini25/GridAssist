import "@/app//globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TicketProvider } from "@/context/TicketContext";
import { ArticlesProvider } from "@/context/ArticlesContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TicketProvider>
            <ArticlesProvider>
              <Navbar />
              <main className="p-4">{children}</main>
            </ArticlesProvider>
          </TicketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
