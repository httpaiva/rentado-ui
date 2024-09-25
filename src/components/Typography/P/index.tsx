import { ReactNode } from "react";
import { StyledP } from "./styles";
import { colors } from "@/utils/tokens";

interface PProps {
  children: ReactNode;
  color?: string;
}

export const P = ({color = colors.black, ...props}: PProps) => {
  return (
    <StyledP {...props} color={color} />
  );
}
