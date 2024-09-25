import styled from "styled-components";

interface StyledH2Props {
  color: string;
}
  
  export const StyledH2 = styled.h2<StyledH2Props>`
    color: ${(props) => props.color};
    font-size: 40px;
    font-weight: 600;
  `;