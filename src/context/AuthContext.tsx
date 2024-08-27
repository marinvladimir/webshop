// src/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  user: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      setUser(localStorage.getItem("username"));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("username", username);
      setIsAuthenticated(true);
      setUser(username);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshAuthToken = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        // For DummyJSON, a token refresh might be implemented differently.
        // If there is no refresh endpoint, consider re-logging or managing tokens differently.
        const response = await fetch("https://dummyjson.com/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token refresh failed");
        }

        const data = await response.json();
        localStorage.setItem("accessToken", data.token);
      } catch (error) {
        console.error("Token refresh error:", error);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshAuthToken, 10 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshAuthToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, refreshAuthToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
