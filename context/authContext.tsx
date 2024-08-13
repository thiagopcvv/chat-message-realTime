import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>({
  user: {},
  setUser: () => {},
  loading: false,
  isAuthenticated: true,
  perssistSessions: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const isAuthenticated = true;

  useEffect(() => {}, []);
  const authenticate = async ({ login, password }: any) => {
    // setLoading(true);
  };

  const perssistSessions = async () => {};

  const logout = async ({ login, password }: any) => {
    // setLoading(true);
  };

  const register = async ({ login, password, name, profile }: any) => {
    // setLoading(true);
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    authenticate,
    perssistSessions,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  console.log(value);

  if (!value) {
    throw new Error("erro useContext");
  }

  return value;
};
