import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kavindu Perera | Software Engineer",
  description: "Personal portfolio of Kavindu Perera, Software Engineer at Wiley",
  authors: [{ name: "Kavindu Perera" }],
  keywords: ["software engineer", "web development", "portfolio", "Kavindu Perera"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            img-src 'self' data: https:;
            script-src 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            connect-src 'self';
            frame-ancestors 'none';
            form-action 'self';
            base-uri 'self';
          `.replace(/\s+/g, ' ').trim()}
        />
        <meta
          httpEquiv="X-Content-Type-Options"
          content="nosniff"
        />
        <meta
          httpEquiv="X-Frame-Options"
          content="DENY"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <meta
          name="referrer"
          content="strict-origin-when-cross-origin"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
