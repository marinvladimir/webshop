import React, { useState } from "react";
import Modal from "../../components/Modal";
import PriceFilter from "../../components/PriceFilter";
import CategoryFilter from "../../components/CategoryFilter";
import SortOptions from "../../components/SortOptions";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";
import PageSizeDropdown from "../../components/PageSizeDropdown";
import { useCart } from "../../context/CartContext";
import {
  Details,
  ProductButton,
  ProductCard,
  ProductContainer,
  ProductImage,
} from "./ProductListStyledComponents";

export interface Product {
  availabilityStatus: string;
  brand: string;
  id: number;
  title: string;
  price: number;
  rating: number;
  discountPercentage?: number;
  images: string[];
  description: string;
  category: string;
}

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const DEFAULT_PAGE_SIZE = 20;

interface ProductProps {
  products: Product[];
}

const ProductList: React.FC<ProductProps> = ({ products }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({
    label: "All",
    min: 0,
    max: Infinity,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const { addToCart } = useCart();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const sortProducts = (products: Product[], sortType: string): Product[] => {
    switch (sortType) {
      case "priceAsc":
        return [...products].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...products].sort((a, b) => b.price - a.price);
      case "nameAsc":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max &&
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts, selectedSort);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage?: number
  ): number => {
    if (!discountPercentage) return price;
    return price - price * (discountPercentage / 100);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <>
      <SearchInput onSearch={setSearchQuery} />
      <PriceFilter
        selectedRange={selectedPriceRange}
        onSelectRange={setSelectedPriceRange}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <SortOptions selectedSort={selectedSort} onSortChange={setSelectedSort} />
      <PageSizeDropdown
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />

      <ProductContainer>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.images[0]} alt={product.title} />
            <h3 style={{ fontSize: "1.2em", margin: "0px 0" }}>
              {product.title}
            </h3>
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
                <ProductButton onClick={() => openModal(product)}>
                  View Details
                </ProductButton>
                <ProductButton
                  disabled={product.availabilityStatus !== "In Stock"}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </ProductButton>
              </div>
            </div>
          </ProductCard>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedProduct && (
            <div>
              <h2>{selectedProduct.title}</h2>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  height: "200px",
                }}
              />
              <p>Brand: {selectedProduct.brand}</p>
              <p>Availability: {selectedProduct.availabilityStatus}</p>
              <p>Rating: {selectedProduct.rating}</p>
              <p>{selectedProduct.description}</p>
              <p style={{ color: "#c7253e" }}>
                $
                {calculateDiscountedPrice(
                  selectedProduct.price,
                  selectedProduct.discountPercentage
                ).toFixed(2)}
                {selectedProduct.discountPercentage && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "8px",
                      color: "#888",
                    }}
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          )}
        </Modal>
      </ProductContainer>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default ProductList;
