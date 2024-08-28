import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "../pages/ProductList/ProductList";
import { CartProvider } from "../context/CartContext";
import { Product } from "../types";

const mockProduct: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 100,
    discountPercentage: 10,
    images: ["image1.jpg"],
    availabilityStatus: "",
    brand: "",
    rating: 0,
    category: "",
  },
];

describe("ProductList Component", () => {
  it("renders product list correctly", () => {
    render(
      <CartProvider>
        <ProductList products={mockProduct} />
      </CartProvider>
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("renders product descriptions correctly", () => {
    render(
      <CartProvider>
        <ProductList products={mockProduct} />
      </CartProvider>
    );
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });
});
