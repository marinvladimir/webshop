import React from "react";
import { StyledButton } from "./CategoryFilterStyledComponents";
import { CategoryFilterProps } from "../../types";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter by Category</h3>
      {categories.map((category) => (
        <StyledButton
          key={category}
          onClick={() => onSelectCategory(category)}
          style={{
            backgroundColor: selectedCategory === category ? "#8D493A" : "#fff",
            color: selectedCategory === category ? "#fff" : "#000",
          }}
        >
          {category}
        </StyledButton>
      ))}
      <StyledButton
        onClick={() => onSelectCategory("")}
        style={{
          backgroundColor: selectedCategory === "" ? "#8D493A" : "#fff",
          color: selectedCategory === "" ? "#fff" : "#000",
        }}
      >
        All
      </StyledButton>
    </div>
  );
};

export default CategoryFilter;
