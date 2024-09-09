import { AuthProvider } from "@/context/authContext";
import { useAuth } from "../hooks/useAuth";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { testePusher } from "@/index";

export default function RootLayout() {
  const MainLayout = () => {
    const { isAuthenticated, loading, persistSessions } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        persistSessions();
      }
    }, [isAuthenticated]);

    useEffect(() => {
      testePusher();
      if (!loading) {
        if (isAuthenticated) {
          router.replace("/(authenticated)");
        } else {
          router.replace("/signIn");
        }
      }
    }, [isAuthenticated]);

    if (loading) {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#15a5da" />
        </View>
      );
    }

    return <Slot />;
  };

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
