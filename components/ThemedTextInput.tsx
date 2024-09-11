import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "react-native-paper";

type iThemedTextInputProps = TextInputProps & {
  label: string;
  value: string;
  onChangeText: any;
  error: any;
  darkColor?: string;
  lightColor?: string;
  style?: any;
};

export function ThemedTextInput({
  label,
  value,
  onChangeText,
  error,
  darkColor,
  lightColor,
  style,
  ...otherProps
}: iThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const textColor = useThemeColor(
    { light: Colors.light.label, dark: Colors.light.tint },
    "text",
  );
  return (
    <TextInput
      activeUnderlineColor={textColor}
      outlineColor={textColor}
      underlineColor={textColor}
      textColor={textColor}
      style={[{ backgroundColor, color: textColor }, style]}
      label={label}
      value={value}
      onChangeText={onChangeText}
      error={error}
      {...otherProps}
    />
  );
}
