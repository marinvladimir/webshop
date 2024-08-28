import React from "react";
import { Product } from "../../types";
import {
  Details,
  ProductButton,
  ProductCard,
  ProductImage,
} from "./ProductItemStyledComponents";

interface ProductItemProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  const calculateDiscountedPrice = (
    price: number,
    discountPercentage?: number
  ): number => {
    if (!discountPercentage) return price;
    return price - price * (discountPercentage / 100);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <ProductCard key={product.id}>
      <ProductImage src={product.images[0]} alt={product.title} />
      <h3 style={{ fontSize: "1.2em", margin: "0px 0" }}>{product.title}</h3>
      <div>
        <p style={{ fontSize: "1em", color: "#c7253e" }}>
          {calculateDiscountedPrice(
            product.price,
            product.discountPercentage
          ).toFixed(2)}
          {product.discountPercentage && (
            <span
              style={{
                textDecoration: "line-through",
                marginLeft: "8px",
                color: "#888",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
        <Details>{truncateText(product.description, 100)}</Details>
        <div>
          <ProductButton onClick={() => onViewDetails(product)}>
            View Details
          </ProductButton>
          <ProductButton
            disabled={product.availabilityStatus !== "In Stock"}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </ProductButton>
        </div>
      </div>
    </ProductCard>
  );
};

export default ProductItem;
