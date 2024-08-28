import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
