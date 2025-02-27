import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<{
  token: string | null;
  setToken: (newToken: string | null) => void;
  setImageToken: (newToken: string | null) => void;
  imageToken: string | null;
}>({
  setToken: () => {},
  token: null,
  setImageToken: () => {},
  imageToken: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));
  const [imageToken, setImageToken_] = useState(localStorage.getItem('imageToken'));
  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };
  const setImageToken = (newToken: string | null) => {
    setImageToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  useEffect(() => {
    if (imageToken) {
      localStorage.setItem('imageToken', imageToken);
    } else {
      localStorage.removeItem('imageToken');
    }
  }, [imageToken]);
  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      setImageToken,
      imageToken,
    }),
    [token]
  );
  // Memoized value of the authentication context
  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
