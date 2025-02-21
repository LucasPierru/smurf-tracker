import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SmurfTracker - Report Smurfs in Valorant & Keep Matches Fair",
  description:
    "Report smurf accounts in Valorant with SmurfTracker. Help keep ranked matches fair by submitting reports, tracking suspected smurfs, and contributing to a cleaner competitive experience. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className}`}>{children}</body>
    </html>
  );
}
