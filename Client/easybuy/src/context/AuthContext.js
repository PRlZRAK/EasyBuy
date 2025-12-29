import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const access = localStorage.getItem("access");
    if (!access) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/me/");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const toggleSellerMode = async (value) => {
    try {
      const res = await api.patch("/api/me/seller-mode/", {
        is_seller: value,
      });

      setUser((prev) => ({
        ...prev,
        is_seller: res.data.is_seller,
      }));
    } catch (err) {
      console.error("Failed to change seller mode", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchUser, loading, toggleSellerMode }}
    >
      {children}
    </AuthContext.Provider>
  );
}
