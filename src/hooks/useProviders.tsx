"use client";

import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider theme={defaultTheme}>{children}</Provider>;
}
