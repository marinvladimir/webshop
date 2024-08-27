import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const ProductCard = styled.div`
  border: 1px solid #d0b8a8;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 200px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 150px;
  }
`;

export const Details = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
  margin: 10px 0;
`;

export const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export const ProductButton = styled.button<{ disabled?: boolean }>`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background-color: #8d493a;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: #fff;
  border-radius: 4px;
`;

export const ProductImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  height: 200px;
  border-radius: 4px;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100px;
    max-height: 100px;
  }
`;
