import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { ReactNode } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
  title: "아카이브 도박장",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ko">
        <body>
          <CookiesProvider>
            <ThemeProvider>
              <div className="flex items-center justify-center">
                <div style={{ aspectRatio: "10/16", height: "100vh" }}>
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </CookiesProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
