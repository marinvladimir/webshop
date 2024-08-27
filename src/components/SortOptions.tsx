import React from "react";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const Select = styled.select`
  padding: 10px;
  borderradius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

interface SortOptionsProps {
  selectedSort: string;
  onSortChange: (sortType: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  selectedSort,
  onSortChange,
}) => {
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <h3>Sort by</h3>
      <Select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">None</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="nameAsc">Name: A to Z</option>
      </Select>
    </div>
  );
};

export default SortOptions;
