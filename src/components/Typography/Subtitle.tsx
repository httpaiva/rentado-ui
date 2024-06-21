import { ReactNode } from "react";

interface SubtitleProps {
  children: ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <h1 className="font-regular text-sm text-neutral-500 py-1">{children}</h1>
  );
}
