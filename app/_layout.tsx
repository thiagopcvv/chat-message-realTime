import { AuthProvider, useAuth } from "@/context/authContext";
import { Slot, Stack, router, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function RootLayout() {
  const { isAuthenticated, loading, perssistSessions } = useAuth();
  // if (!isAuthenticated) {
  //   perssistSessions();
  // }

  const MainLayout = () => {
    if (loading) {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#15a5da" />
        </View>
      );
    }

    useEffect(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/signIn");
      }
    }, [isAuthenticated]);
    return <Slot />;
  };

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
