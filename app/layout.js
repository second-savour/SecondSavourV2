import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//Components

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Second Savour",
  description:
    "Second Savour was founded by a group of friends at Simon Fraser University (SFU) with a mission to create environmental change.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="public/favicon.ico" sizes="any" />
        {/* Add any additional meta tags or link elements here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
