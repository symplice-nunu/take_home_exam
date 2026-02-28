import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Directory",
  description: "Browse and search users from JSONPlaceholder",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
        {modal}
      </body>
    </html>
  );
}
