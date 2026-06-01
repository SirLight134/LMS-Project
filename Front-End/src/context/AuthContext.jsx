import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Done restoring
  }, []);

  const login = (data) => {
    if (!data?.user || !data?.token) {
      console.error("Invalid login data:", data);
      return;
    }

    const userData = { ...data.user, token: data.token };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/");
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5051/api/auth/logout", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error("Logout API call failed:", err);
    }
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
