import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI-04 // macOS Dynamic Island & Magnetic Dock",
  description: "Tactile Magnetic Dock with Magnification Curve Physics, Spring Interactions & Web Audio API Haptics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
