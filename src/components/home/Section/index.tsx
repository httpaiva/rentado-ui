import { ReactNode } from "react";

type SectionProps = {
  bgColor: string;
  id?: string;
  children: ReactNode;
  minHeight?: number;
};

export const Section = ({
  bgColor = "bg-white",
  minHeight = 720,
  id,
  children,
}: SectionProps) => {
  return (
    <section
      className={`flex flex-col justify-center items-center w-full p-8 ${bgColor}`}
      style={{ minHeight: `${minHeight}px` }}
      id={id}
    >
      {children}
    </section>
  );
};
