import styled from "styled-components";

interface StyledPProps {
  color: string;
}
  
  
  export const StyledP = styled.p<StyledPProps>`
    color: ${(props) => props.color};
    font-size: 22px;
    font-weight: 400;
  `;