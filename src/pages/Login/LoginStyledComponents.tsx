import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;

  input {
    height: 30px;
    width: 250px;

    @media (max-width: ${breakpoints.mobile}) {
      width: 100%;
    }
  }
`;
