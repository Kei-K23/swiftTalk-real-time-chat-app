import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import ToastProvider from "@/components/provider/ToastProvider";

export const metadata: Metadata = {
  title: "SwiftTalk",
  description:
    "SwiftTalk is communication web application to communicate with the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="swift-theme"
      >
        <body>
          {children}
          <ToastProvider />
        </body>
      </ThemeProvider>
    </html>
  );
}
