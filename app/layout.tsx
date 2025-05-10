import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vevvion wellness",
  description: "Transform Your Life with Vevvion Wellness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Any head tags here */}
      </head>
      <body className={inter.className}>
        {/* Razorpay script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Providers wraps any global context providers */}
        <Providers>
          {/* Header should not use dynamic values during SSR */}
          <Header />

          {/* Suppress hydration warning on dynamic-only parts (if needed) */}
          <main className="container mx-auto px-4 py-8">
            <div suppressHydrationWarning={true}>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
