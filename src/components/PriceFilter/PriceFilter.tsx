import React from "react";
import { StyledButton } from "../CategoryFilter/CategoryFilterStyledComponents";
import { PriceRange } from "../../types";

const priceRanges: PriceRange[] = [
  { label: "All", min: 0, max: Infinity },
  { label: "$10 - $50", min: 10, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Above $200", min: 200, max: Infinity },
];

interface PriceFilterProps {
  selectedRange: PriceRange;
  onSelectRange: (range: PriceRange) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedRange,
  onSelectRange,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter by Price</h3>
      {priceRanges.map((range) => (
        <StyledButton
          key={range.label}
          onClick={() => onSelectRange(range)}
          style={{
            backgroundColor:
              selectedRange.label === range.label ? "#8D493A" : "#fff",
            color: selectedRange.label === range.label ? "#fff" : "#000",
          }}
        >
          {range.label}
        </StyledButton>
      ))}
    </div>
  );
};

export default PriceFilter;
