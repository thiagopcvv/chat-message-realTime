import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, ButtonProps } from "react-native-paper";

type ButtonThemeProps = ButtonProps & {
  darkColor?: string;
  lightColor?: string;
};

export function ButtonTheme({
  darkColor,
  lightColor,
  style,
  ...otherProps
}: ButtonThemeProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const text = useThemeColor(
    { light: darkColor, dark: lightColor },
    "background"
  );

  return <Button style={style} buttonColor={backgroundColor} textColor={text}{...otherProps} />;
}
