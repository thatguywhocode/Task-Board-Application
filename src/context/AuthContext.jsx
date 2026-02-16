import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localAuth = localStorage.getItem("isAuthenticated");
    const sessionAuth = sessionStorage.getItem("isAuthenticated");

    if (localAuth === "true" || sessionAuth === "true") {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (email, password, rememberMe) => {
    if (email === "intern@demo.com" && password === "intern123") {
      setIsAuthenticated(true);

      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }

      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
