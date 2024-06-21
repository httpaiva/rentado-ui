import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className="font-semibold text-xl text-neutral-900 py-3">{children}</h1>
  );
}
