import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList, { Product } from "./ProductList";

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 100,
    discountPercentage: 10,
    images: ["image1.jpg"],
    availabilityStatus: "In Stock",
    brand: "",
    rating: 0,
    category: "",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    price: 200,
    discountPercentage: 20,
    images: ["image2.jpg"],
    availabilityStatus: "In Stock",
    brand: "",
    rating: 0,
    category: "",
  },
];

describe("ProductList Component", () => {
  test("renders product list correctly", () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
