import styled from "styled-components";

type StyledSectionProps = {
    bgColor: string;
  }
  
  export const StyledSection = styled.section<StyledSectionProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
    width: 100%;
    min-height: 720px;
  `;