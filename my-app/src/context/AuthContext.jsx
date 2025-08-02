  import { createContext, useState, useEffect } from "react";

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false); // Set loading to false after checking localStorage
    }, []);

    const login = ({ token, user }) => {
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    // Helper function to check if user is authenticated
    const isAuthenticated = () => {
      return token && user;
    };

    return (
      <AuthContext.Provider value={{ 
        token, 
        user, 
        isLoading,
        login, 
        logout, 
        isAuthenticated 
      }}>
        {children}
      </AuthContext.Provider>
    );
  };
