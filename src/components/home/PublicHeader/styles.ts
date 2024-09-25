import styled from "styled-components";
import { colors } from "@/utils/tokens";

export const HeaderWrapper = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  max-width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.black};
  padding: 24px;
`;

export const HeaderGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const HeaderAnchor = styled.a`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray_dark};
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 16px;
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: #495057;
  }

  &:active {
    background-color: #23272b;
  }
`;
