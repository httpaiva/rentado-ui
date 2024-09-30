import { ReactNode } from "react";
import { StyledH1 } from "./styles";
import { colors } from "@/utils/tokens";

interface H1Props {
  children: ReactNode;
  color?: string;
}

export const H1 = ({color = colors.black, ...props}: H1Props) => {
  return (
    <StyledH1 {...props} color={color} />
  );
}
