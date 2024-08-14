import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
export const AuthContext = createContext<any>({
  user: {},
  setUser: () => {},
  loading: false,
  isAuthenticated: false,
  perssistSessions: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
      }

      return unsub;
    });
  }, []);

  const authenticate = async ({ email, password }: any) => {
    try {
      
     
    } catch (error) {
     
    }
  };

  const perssistSessions = async () => {};

  const logout = async ({ email, password }: any) => {
    // setLoading(true);
  };

  const register = async ({ email, password, name, profile }: any) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);

      await setDoc(doc(db, "users", response.user.uid), {
        profile,
        userId: response.user.uid,
      });

      return { succes: true, data: response.user };
    } catch (error) {
      return { succes: false, msg: error };
    }
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
