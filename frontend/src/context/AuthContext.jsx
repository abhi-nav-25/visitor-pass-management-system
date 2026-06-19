import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    } else {
      localStorage.removeItem("name");
    }
  }, [name]);

  const login = (newToken, newRole, newName) => {
    setToken(newToken);
    setRole(newRole);
    setName(newName);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        name,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;