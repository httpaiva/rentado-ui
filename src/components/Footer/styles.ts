import styled from "styled-components";
import { colors } from "@/utils/tokens";

export const FooterWrapper = styled.footer`
  max-width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.black};
  padding: 24px 120px ;
`;

export const FooterGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;