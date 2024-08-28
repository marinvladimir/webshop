import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart/Cart";

// Mock the useCart hook
jest.mock("../context/CartContext");

describe("Cart Component", () => {
  const mockClearCart = jest.fn();
  const mockDecrementItemQuantity = jest.fn();

  const mockCart = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      discountPercentage: 20,
      quantity: 2,
      images: ["image1.jpg"],
    },
    {
      id: 2,
      title: "Product 2",
      price: 50,
      discountPercentage: 10,
      quantity: 1,
      images: ["image2.jpg"],
    },
  ];

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();

    // Set up the mock implementation
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      clearCart: mockClearCart,
      decrementItemQuantity: mockDecrementItemQuantity,
    });
  });

  it("renders correctly with items in the cart", () => {
    render(<Cart />);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    const discountedPrice1 = (
      mockCart[0].price -
      mockCart[0].price * (mockCart[0].discountPercentage / 100)
    ).toFixed(2);
    const discountedPrice2 = (
      mockCart[1].price -
      mockCart[1].price * (mockCart[1].discountPercentage / 100)
    ).toFixed(2);

    expect(screen.getByText(`$${discountedPrice1} x 2`)).toBeInTheDocument();
    expect(screen.getByText(`$${discountedPrice2} x 1`)).toBeInTheDocument();
  });

  it("renders correctly when the cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      clearCart: mockClearCart,
      decrementItemQuantity: mockDecrementItemQuantity,
    });

    render(<Cart />);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it('calls clearCart function when "Clear Cart" button is clicked', () => {
    render(<Cart />);

    const clearButton = screen.getByText("Clear Cart");
    fireEvent.click(clearButton);

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it('calls decrementItemQuantity function when "Remove" button is clicked for an item', () => {
    render(<Cart />);

    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    expect(mockDecrementItemQuantity).toHaveBeenCalledTimes(1);
    expect(mockDecrementItemQuantity).toHaveBeenCalledWith(mockCart[0].id);
  });
});
