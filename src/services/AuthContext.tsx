import { createContext, useContext, useState } from "react";
import { AuthService } from "./AuthService";
interface User {
  role: "USER" | "ADMIN";
  login: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (login: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);


  const login = (login: string, password: string) => {
    AuthService.login(login, password)
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
        console.log("Login failed", error);
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("useAuth must be used within AuthProvider");

    return context;
}