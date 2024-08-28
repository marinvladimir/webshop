import React from "react";
import { Select } from "./SortOptionsStyledComponents";
import { SortOptionsProps } from "../../types";

const SortOptions: React.FC<SortOptionsProps> = ({
  selectedSort,
  onSortChange,
}) => {
  const optionValues = [
    { value: "", text: "None" },
    { value: "priceAsc", text: "Price: Low to High" },
    { value: "priceDesc", text: "Price: High to Low" },
    { value: "nameAsc", text: "Name: A to Z" },
  ];

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Sort by</h3>
      <Select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {optionValues.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SortOptions;
