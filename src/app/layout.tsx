import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ProvideAuth } from "@/components/use-auth";

export const metadata: Metadata = {
  title: "E-mail Data Scraper",
  description: "Provided by Pixxel Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ProvideAuth>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ProvideAuth>
      </body>
    </html>
  );
}
