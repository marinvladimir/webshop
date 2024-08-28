import React from "react";
import { Select } from "./SortOptionsStyledComponents";
import { SortOptionsProps } from "../../types";

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
