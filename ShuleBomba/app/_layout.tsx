import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useRouter} from 'expo-router';
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CircleUserRound } from "lucide-react-native";
import { rootStore } from "@/components/models";
import { Provider } from "mobx-react";
import React from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router=useRouter();
  const onUserAccount = () =>{
    router.push("/account")

  }

  return (
    <Provider rootstore={rootStore}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              title: "ShuleBomba",
              headerRight: ({}) => <CircleUserRound style={{ padding: 10 }} onPress={onUserAccount}/>,
            }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Screen name="account" options={{ title: "Account Info" }} />
          <Stack.Screen name="(classes)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
