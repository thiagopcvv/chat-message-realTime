import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { TextInput, Button, HelperText } from "react-native-paper";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ButtonTheme } from "@/components/ButtonTheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [securePassword, setSecurePassword] = useState<boolean>(true);
  const [confirmSecure, setConfirmSecure] = useState<boolean>(true);

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const validateFields = () => {
    const newErrors: any = {};
    if (!username) {
      newErrors.username = "Username é obrigatório";
    }
    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de email inválido";
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateFields()) {
      // Lógica de cadastro aqui
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 3, backgroundColor }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <ThemedView
        style={styles.container}
        darkColor={Colors.dark.background}
        lightColor={Colors.light.background}
      >
        <ThemedText
          style={styles.title}
          darkColor={Colors.dark.text}
          lightColor={Colors.light.text}
        >
          Cadastrar
        </ThemedText>

        <ThemedTextInput
          darkColor={Colors.dark.tint}
          lightColor={Colors.light.tint}
          label="Username"
          value={username}
          onChangeText={setUsername}
          error={!!errors.username}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.username}>
          {errors.username}
        </HelperText>

        <ThemedTextInput
          darkColor={Colors.dark.tint}
          lightColor={Colors.light.tint}
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={!!errors.email}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>

        <ThemedTextInput
          darkColor={Colors.dark.tint}
          lightColor={Colors.light.tint}
          label="Senha"
          value={password}
          onChangeText={setPassword}
          error={!!errors.password}
          style={styles.input}
          secureTextEntry={securePassword}
          right={
            <TextInput.Icon
              icon={securePassword ? "eye" : "eye-off"}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <ThemedTextInput
          darkColor={Colors.dark.tint}
          lightColor={Colors.light.tint}
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={!!errors.confirmPassword}
          style={styles.input}
          secureTextEntry={confirmSecure}
          right={
            <TextInput.Icon
              icon={confirmSecure ? "eye" : "eye-off"}
              onPress={() => setConfirmSecure(!confirmSecure)}
            />
          }
        />
        <HelperText type="error" visible={!!errors.confirmPassword}>
          {errors.confirmPassword}
        </HelperText>

        <ButtonTheme
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          darkColor={Colors.dark.buttonPrimary}
          lightColor={Colors.light.buttonPrimary}
        >
          Cadastrar
        </ButtonTheme>
        <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => router.replace("/signIn")}
        >
          <ThemedText
            darkColor={Colors.dark.text}
            lightColor={Colors.light.text}
          >
            Entrar com uma conta existente!
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginTop: "15%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
