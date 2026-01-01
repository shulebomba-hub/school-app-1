import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CircleUserRound } from "lucide-react-native";
import { rootStore } from "@/components/models";
import { Provider } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applySnapshot } from "mobx-state-tree";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const router = useRouter();
  const loadinitialData = useCallback(async () => {
    const storedData = await AsyncStorage.getItem("rootStore");
    if (storedData) {
      const rootStoreData = JSON.parse(storedData);
      applySnapshot(rootStore, rootStoreData);
    }
  }, []);
  useEffect(() => {
    loadinitialData();
  }, []);
  const isDark = colorScheme === "dark";

  const onUserAccount = () => {
    router.push("/account");
  };

  return (
    <Provider rootstore={rootStore}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? "#000" : "#fff",
            },
            headerTintColor: isDark ? "#fff" : "#000",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "ShuleBomba",
              headerRight: () => (
                <CircleUserRound
                  size={22}
                  color={isDark ? "#fff" : "#000"}
                  style={{ marginRight: 12 }}
                  onPress={onUserAccount}
                />
              ),
            }}
          />

          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Modal",
            }}
          />

          <Stack.Screen
            name="account"
            options={{ title: "Account Info" }}
          />

          <Stack.Screen
            name="(classes)"
            options={{ headerShown: false }}
          />
        </Stack>

        {/* Status bar theme */}
        <StatusBar style={isDark ? "light" : "dark"} />
      </ThemeProvider>
    </Provider>
  );
}
