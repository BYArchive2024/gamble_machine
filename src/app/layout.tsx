import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

export const metadata: Metadata = {
  title: "아카이브 도박장",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html>
        <body>
          <div className="flex items-center justify-center">
            <div style={{ aspectRatio: "10/16", height: "100vh" }}>
              {children}
            </div>
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
