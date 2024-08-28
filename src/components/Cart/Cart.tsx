import React from "react";
import { useCart } from "../../context/CartContext";
import { CartButton, CartContainer } from "./CartStyledComponents";

const Cart: React.FC = () => {
  const { cart, clearCart, decrementItemQuantity } = useCart();

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage?: number
  ): number => {
    if (!discountPercentage) return price;
    return price - price * (discountPercentage / 100);
  };

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                justifyContent: "center",
                flexDirection: "column",
                borderTop: "1px solid black",
              }}
            >
              <img
                src={item.images && item?.images[0]}
                alt={item.title}
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h3>{item.title}</h3>
                <p>
                  $
                  {calculateDiscountedPrice(
                    item.price,
                    item.discountPercentage
                  ).toFixed(2)}{" "}
                  x {item.quantity}
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "8px",
                      color: "#888",
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </p>
                <CartButton onClick={() => decrementItemQuantity(item.id)}>
                  Remove
                </CartButton>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid black", paddingTop: "16px" }}>
            <CartButton onClick={clearCart}>Clear Cart</CartButton>
          </div>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
