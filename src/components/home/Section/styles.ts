import styled from "styled-components";

type StyledSectionProps = {
    bgColor: string;
    minHeight?: number;
  }
  
  export const StyledSection = styled.section<StyledSectionProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
    width: 100%;
    min-height: ${(props) => props.minHeight ? `${props.minHeight}px` : '720px'};
    padding: 30px;
  `;