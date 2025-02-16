import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const themeCookie =
    (await cookies()).get("cloud-app-base-theme")?.value == "light"
      ? "light"
      : "dark";

  return (
    <html lang="en" className={cn(GeistSans.variable, themeCookie)}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};
export default RootLayout;
