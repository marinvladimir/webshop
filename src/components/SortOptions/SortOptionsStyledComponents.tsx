import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Select = styled.select`
  padding: 10px;
  borderradius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
