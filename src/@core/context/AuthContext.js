import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if running on the client side before accessing localStorage
  const isClient = typeof window !== 'undefined';

  // Check if there is an authentication status in local storage
  const initialIsLoggedIn = isClient ? localStorage.getItem('isLoggedIn') === 'true' : false;

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  const login = () => {
    setIsLoggedIn(true);
    // Store in local storage only if running on the client side
    isClient && localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove from local storage only if running on the client side
    isClient && localStorage.removeItem('isLoggedIn');
  };

  // Remove the stored value when the component is unmounted
  useEffect(() => {
    return () => {
      // Clear local storage only if running on the client side
      isClient && localStorage.removeItem('isLoggedIn');
    };
  }, [isClient]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  return context;
};
