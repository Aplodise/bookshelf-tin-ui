import { createContext, useContext, useState } from "react";
import { AuthService } from "./AuthService";
interface User {
  role: "USER" | "ADMIN";
  login: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  register: (
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (login: string, password: string): Promise<void> => {
    await AuthService.login(login, password)
      .then((response) => {
        if (response?.login && response?.token) {
          const userData: User = {
            role: response.role,
            login: response.login,
            token: response.token,
          };
          setUser(userData);
        }
      })
      .catch((error) => {
        console.error("Login failed", error.message);
        throw error;
      });
  };
  const register = async (
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ): Promise<void> => {
    await AuthService.register(login, password, firstName, lastName, role)
      .then((response) => {
        if (response?.login && response?.token) {
          const userData: User = {
            role: response.role,
            login: response.login,
            token: response.token,
          };
          setUser(userData);
        }
      })
      .catch((error) => {
        console.error("Registration failed", error.message);
        throw error;
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
}
