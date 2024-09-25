import { ReactNode } from "react";
import { StyledSection } from "./styles"

type SectionProps = {
  bgColor: string;
  id?: string;
  children: ReactNode;
  minHeight?: number;
}

export const Section = (props: SectionProps) => {
  return(
    <StyledSection {...props} />
  );
}