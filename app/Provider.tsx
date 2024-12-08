"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
