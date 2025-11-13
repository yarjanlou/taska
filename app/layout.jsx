import "./globals.css";

import { Montserrat } from "next/font/google";
import Providers from "./providers/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Taska",
  description: "project management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
