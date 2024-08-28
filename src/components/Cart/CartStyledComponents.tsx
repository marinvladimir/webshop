import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const CartButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #8d493a;
  color: #fff;
`;

export const CartContainer = styled.div`
  border: 1px solid #d0b8a8;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  margin: 20px auto;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 0px;
  }
`;
