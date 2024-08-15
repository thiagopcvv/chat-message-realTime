import { useThemeColor } from "@/hooks/useThemeColor";
import { darkColors } from "@rneui/base";
import { useState } from "react";
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
}: SearchBarThemedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const backGround = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: textLightColor, dark: textDarkColor },
    "text"
  );

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SerachBarThemed;
