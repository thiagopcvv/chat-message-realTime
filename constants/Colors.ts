/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#000";
const tintColorDark = "#fff";

export const Colors = {
  primaryColor: "#0a74d8",
  light: {
    buttonPrimary: "#000",
    label: "#fff",
    text: "#11181C",
    background: "#fff",
    background2: "#e9e9e9",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    buttonPrimary: "#fff",
    text: "#ECEDEE",
    background: "#101d24",
    backHeader: "#151718",
    background2: "#000000e3",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
