import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login/Login";
import ProductList, { Product } from "./pages/ProductList/ProductList";
import styled from "styled-components";
import { breakpoints } from "./styles/breakpoints";
import { useEffect, useState } from "react";
import { fetchProducts } from "./services/productService";

export const LogoutButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #c7253e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
`;

const Heading = styled.h1`
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.6rem;
  }
`;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

const MainContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Heading>SPA katalog proizvoda</Heading>
      {isAuthenticated ? (
        <div>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
          <PageWrapper>
            <ProductList products={products} />
            <Cart />
          </PageWrapper>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
