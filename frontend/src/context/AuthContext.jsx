import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchProfile, loginUser, logoutUser, registerUser, updateProfile as updateProfileApi } from "../api/auth.api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProfile();
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setBootstrapping(false);
      }
    })();
  }, []);

  const login = useCallback(async (payload) => {
    const res = await loginUser(payload);
    setUser(res.data.data);
    return res.data.data;
  }, []);

  const register = useCallback(async (formData) => {
    const res = await registerUser(formData);
    return res.data.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (formData) => {
    const res = await updateProfileApi(formData);
    setUser(res.data.data);
    return res.data.data;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, bootstrapping, isAuthenticated: !!user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
