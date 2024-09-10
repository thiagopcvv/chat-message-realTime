import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Searchbar, SearchbarProps } from "react-native-paper";

type SearchBarThemedProps = SearchbarProps & {
  darkColor?: string;
  lightColor?: string;
  textDarkColor?: string;
  textLightColor?: string;
};

const SerachBarThemed = ({
  darkColor,
  lightColor,
  textDarkColor,
  textLightColor,
  ...props
}: SearchBarThemedProps) => {
  const backGround = useThemeColor(
    { light: Colors.dark.background, dark: Colors.light.background },
    "background"
  );
  const color = useThemeColor(
    { light: Colors.dark.tint, dark: Colors.light.tint },
    "text"
  );

  return (
    <Searchbar
      {...props}
      iconColor={color}
      elevation={5}
      placeholderTextColor={color}
      style={{
        backgroundColor: backGround,
        color: color,
        marginBottom: 20,
        width: "100%",
        shadowColor: backGround,
      }}
      selectionColor={Colors.primaryColor}
      inputStyle={{ color: color }}
    />
  );
};

export default SerachBarThemed;
