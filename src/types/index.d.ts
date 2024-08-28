export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface PageSizeDropdownProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
}

export interface SortOptionsProps {
  selectedSort: string;
  onSortChange: (sortType: string) => void;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  user: string | null;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  decrementItemQuantity: (productId: number) => void;
}

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

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface ProductProps {
  products: Product[];
}
