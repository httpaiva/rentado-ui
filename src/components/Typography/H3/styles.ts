import styled from "styled-components";

interface StyledH3Props {
  color: string;
}
  
  
  export const StyledH3 = styled.h3<StyledH3Props>`
    color: ${(props) => props.color};
    font-size: 28px;
    font-weight: 400;
  `;