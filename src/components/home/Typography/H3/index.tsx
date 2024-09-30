import { ReactNode } from "react";
import { StyledH3 } from "./styles";
import { colors } from "@/utils/tokens";

interface H3Props {
  children: ReactNode;
  color?: string;
}

export const H3 = ({color = colors.black, ...props}: H3Props) => {
  return (
    <StyledH3 {...props} color={color} />
  );
}
