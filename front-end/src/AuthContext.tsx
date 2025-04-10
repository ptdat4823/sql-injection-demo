import { createContext, useState, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (token: string) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("something went wrong with AuthContext");
  }
  return context;
};
