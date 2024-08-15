import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function SettingsScreen() {
  const [username, setUsername] = useState("John Doe");
  const [profileImage, setProfileImage] = useState(null);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
  };

  const handleEditProfile = () => {
    // Navegar para a tela de edição de perfil
  };

  const handleChangePassword = () => {
    // Navegar para a tela de troca de senha
  };

  return (
    <ThemedView
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
      style={styles.container}
    >
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleEditProfile}>
          {profileImage ? (
            <Avatar.Image size={100} source={{ uri: profileImage }} />
          ) : (
            <Avatar.Icon
              size={100}
              icon="account"
              style={{ backgroundColor: "#2251ae" }}
            />
          )}
        </TouchableOpacity>
        <ThemedText style={styles.username}>{username}</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleEditProfile}
          style={styles.button}
        >
          Editar Perfil
        </Button>

        <Button
          mode="contained"
          onPress={handleChangePassword}
          style={styles.button}
        >
          Trocar Senha
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
    flexDirection: "row",
    gap: 10
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    marginBottom: 20,
    backgroundColor: Colors.dark.background,
  },
  logoutButton: {
    backgroundColor: Colors.dark.background,
  },
});
