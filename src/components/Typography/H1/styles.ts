import styled from "styled-components";

interface StyledH1Props {
  color: string;
}
  
  export const StyledH1 = styled.h1<StyledH1Props>`
    color: ${(props) => props.color};
    font-size: 52px;
    font-weight: 700;
  `;