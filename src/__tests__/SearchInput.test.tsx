import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../components/SearchInput/SearchInput";

describe("SearchInput Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field correctly", () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search products...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("updates the input value on change", () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search products...");

    fireEvent.change(inputElement, { target: { value: "Laptop" } });
    expect(inputElement).toHaveValue("Laptop");
  });

  it("calls onSearch function after typing with debounce", async () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search products...");

    fireEvent.change(inputElement, { target: { value: "Phone" } });

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith("Phone"), {
      timeout: 400,
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it("debounces multiple rapid changes and only calls onSearch once", async () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search products...");

    fireEvent.change(inputElement, { target: { value: "Ph" } });
    fireEvent.change(inputElement, { target: { value: "Pho" } });
    fireEvent.change(inputElement, { target: { value: "Phone" } });

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith("Phone"), {
      timeout: 400,
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
