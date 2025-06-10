import type { Metadata } from "next";
import type React from "react";
import { ApplicationLayout } from "./application-layout";

export const metadata: Metadata = {
  title: {
    template: "%s - Tafawwaq",
    default: "Tafawwaq",
  },
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white lg:bg-zinc-100 dark:lg:bg-zinc-950">
      <ApplicationLayout>{children}</ApplicationLayout>
    </main>
  );
}
