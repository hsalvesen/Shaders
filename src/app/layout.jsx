import "./globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { DarkModeProvider } from "./context/DarkContext";


const JetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-JetBrains_body",
});
const space_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space_Grotesk_title",
});
export const metadata = {
  title: "Haz Portfolio",
  description: "This is a portfolio website of Haz",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${JetBrains.variable} ${space_Grotesk.variable}`}
    >
      <body className="font-bFont">
        <DarkModeProvider>
          <Navbar />
          {/**/}
          {children}
          {/*<Footer />*/}
        </DarkModeProvider>
      </body>
    </html>
  );
}

