import { ReactNode } from "react";
import { StyledH2 } from "./styles";
import { colors } from "@/utils/tokens";

interface H2Props {
  children: ReactNode;
  color?: string;
}

export const H2 = ({color = colors.black, ...props}: H2Props) => {
  return (
    <StyledH2 {...props} color={color} />
  );
}
