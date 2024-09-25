import styled from "styled-components";
import { colors } from "@/utils/tokens";

interface CardProps {
  bgColor?: string;
  borderColor?: string;
  gap?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
};

export const CTAButton = styled.button`
  background-color: ${colors.white};
  width: 400px;
  height: 80px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 30px;
  color: ${colors.blue};
  font-weight: 700;

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #eee;
  }
`;

export const Card = styled.div<CardProps>`
  background-color: ${(props) => props.bgColor ? props.bgColor : colors.blue};
  border: ${(props) => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.gap ? `${props.gap}px` : 'none'};
  min-width: ${(props) => props.minWidth ? `${props.minWidth}px` : '220px'};
  max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'none'};
  min-height: ${(props) => props.minHeight ? `${props.minHeight}px` : '180px'};
  max-height: ${(props) => props.maxHeight ? `${props.maxHeight}px` : 'none'};
`;