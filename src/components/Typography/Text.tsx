import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

export default function Text({ children }: TextProps) {
  return (
    <h1 className="font-regular text-sm text-neutral-600 py-1">{children}</h1>
  );
}
