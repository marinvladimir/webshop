import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });

  it("calls onClose function when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders children content correctly", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>
          <h2>Title</h2>
          <p>Some content inside the modal</p>
        </div>
      </Modal>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(
      screen.getByText("Some content inside the modal")
    ).toBeInTheDocument();
  });
});
