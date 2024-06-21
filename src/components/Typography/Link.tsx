import { ReactNode } from "react";
import NextLink from "next/link";

interface LinkProps {
  children: ReactNode;
  href: string;
}

export default function Link({ children, href }: LinkProps) {
  return (
    <NextLink
      className="font-semibold text-sm py-1 text-green-600 hover:text-green-700 active:text-green-800 underline"
      href={href}
    >
      {children}
    </NextLink>
  );
}
