import { AuthProvider } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function RootLayout() {
  const { isAuthenticated, user, loading, persistSessions } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      persistSessions({isAuthenticated});
    }
  }, [isAuthenticated, loading]);

  const MainLayout = () => {
    useEffect(() => {
      if (!loading) {
        console.log("aq78tb", isAuthenticated)
        if (isAuthenticated) {
          router.replace("/(tabs)");
        } else {
          router.replace("/signIn");
        }
      }
    }, [isAuthenticated, loading]);

    if (loading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
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

