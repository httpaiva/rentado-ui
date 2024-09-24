import { ReactNode } from "react";
import { StyledSection } from "./styles"

type SectionProps = {
  bgColor: string;
  id?: string;
  children: ReactNode;
}

export const Section = (props: SectionProps) => {
  return(
    <StyledSection {...props} />
  );
}