import { AuthProvider } from "@/context/authContext";
import { useAuth } from "../hooks/useAuth";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const MainLayout = () => {
    const { isAuthenticated, loading, persistSessions } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        persistSessions();
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (!loading) {
        if (isAuthenticated) {
          router.replace("/(authenticated)/(tabs)");
        } else {
          router.replace("/signIn");
        }
      }
    }, [isAuthenticated, loading]);

    if (loading) {
      return (
        <ThemedView
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#15a5da" />
        </ThemedView>
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
