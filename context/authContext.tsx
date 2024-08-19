import { createContext, useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";

export const AuthContext = createContext<any>({
  user: {},
  setUser: () => {},
  loading: false,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!Object.keys(user ?? {}).length;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsAuthenticated(false);
  //     } else {
  //       setIsAuthenticated(false);
  //     }

  //     return unsub;
  //   });
  // }, []);

  const authenticate = async ({ email, password }: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const request = await axios.post(
        "http://192.168.100.124:8000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            contentType: false,
          },
        }
      );

      const response = request.data;
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      if (response.user && response.user) {
        router.replace("/(tabs)");
        setLoading(false);
      }
    } catch (error: any) {
      switch (error.response.status) {
        case 401:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nVerifique se o usuário ou senha estão corretos\nA senha diferencia letras maiúsculas e minúsculas"
          );
          break;
        case 504:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nSem conexão com o servidor\nVerifique sua conexão com a internet."
          );
          break;
        case 403:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nVerifique se você ja fez o cadastro!"
          );
        case 422:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nVerifique se você ja fez o cadastro!"
          );
          break;
      }
      Alert.alert("Não foi possível fazer login! \n Tente em alguns minutos!");
    }
  };

  const persistSessions = async ({isAuthenticated}) => {
    console.log("Iniciando persistSessions");
    try {
      setLoading(true);
      const srtUser = await AsyncStorage.getItem("user");
      console.log("Valor recuperado do AsyncStorage:", srtUser);
      if (srtUser) {
        const storedUser = JSON.parse(srtUser);
        setUser(storedUser);
        console.log("Usuário recuperado:", storedUser);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn("Erro ao recuperar a sessão:", error);
    }
  };

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setLoading(false);
  };

  const register = async ({
    email,
    password,
    name,
    profile,
    confirmPassword,
  }: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    try {
      const request = await axios.post(
        "http://192.168.100.124:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            contentType: false,
          },
        }
      );

      const response = request.data;

      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      setLoading(false);
      if (response.user && response.user) {
        Alert.alert("Bem vindo! \nCadastro feito com sucesso!");
        router.replace("/signIn");
      }
    } catch (error: any) {
      switch (error.response?.status) {
        case 401:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nVerifique se o usuário ou senha estão corretos\nA senha diferencia letras maiúsculas e minúsculas"
          );
          break;
        case 504:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nSem conexão com o servidor\nVerifique sua conexão com a internet."
          );
          break;
        case 403:
          setLoading(false);
          Alert.alert(
            "Não foi possível fazer login",
            "\nVerifique se você ja fez o cadastro!"
          );
      }
    }
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    authenticate,
    persistSessions,
    logout,
    register,
  };

  console.log(value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
