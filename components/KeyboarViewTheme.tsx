import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";

type KeyboardViewThemedProps = KeyboardAvoidingViewProps & {
  darkColor: string;
  lightColor: string;
};

export function KeyboardViewThemed({
  darkColor,
  lightColor,
  style,
  ...otherProps
}: KeyboardViewThemedProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  return <KeyboardAvoidingView style={[{ backgroundColor }, style]} />;
}
