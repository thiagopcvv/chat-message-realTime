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
import { useAuth } from "@/context/authContext";

export default function SignInScreen() {
  const { authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const validateFields = () => {
    const newErrors: any = {};
    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de email inválido";
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateFields()) {
      authenticate({ email, password });
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
          Entrar
        </ThemedText>

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

        <ButtonTheme
          mode="contained"
          onPress={handleSignIn}
          style={styles.button}
          darkColor={Colors.dark.buttonPrimary}
          lightColor={Colors.light.buttonPrimary}
        >
          Entrar
        </ButtonTheme>
        <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => router.replace("/signUp")}
        >
          <ThemedText
            darkColor={Colors.dark.text}
            lightColor={Colors.light.text}
          >
            Criar uma nova conta
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
    marginTop: "25%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
