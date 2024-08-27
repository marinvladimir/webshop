import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
