import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CircleUserRound } from "lucide-react-native";
import { rootStore } from "@/components/models";
import { Provider } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applySnapshot } from "mobx-state-tree";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@/context/ThemeContext";

// Keep the splash screen visible while we fetch resources

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [isReady, setIsReady] = React.useState(false);
   useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const router = useRouter();
  const loadinitialData = useCallback(async () => {
    try {
    const storedData = await AsyncStorage.getItem("rootStore");
    if (storedData) {
      const rootStoreData = JSON.parse(storedData);
      applySnapshot(rootStore, rootStoreData);
    }
  } catch (error) {
    console.error("Failed to load initial data:", error); 
  } finally {
    setIsReady(true); 
  }
}, []);
  useEffect(() => {
    loadinitialData();
  }, []);
  useEffect(() => {
    if (isReady) {
     SplashScreen.hideAsync();
    }
  }, [isReady]);
  if (!isReady) {
    return null; 
  } 
  const isDark = colorScheme === "dark";

  const onUserAccount = () => {
    router.push("/account");
    
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right", "bottom"]}>
      <Provider rootstore={rootStore}>
        <ThemeProvider>
          <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  flex: 1,
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  title: "ShuleBomba",
                  headerBackVisible: false,
                  gestureEnabled: false,
                  headerLeft : ()=>null,
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
                options={{ title: "Account", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="about-app"
                options={{ title: "About App", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="index"
                options={{ title: "Login", headerBackTitle: "Back",headerShown: false }}
              />
              <Stack.Screen
                name="manage-madarasa"
                options={{ title: "Manage Classes", headerBackTitle: "Back"}}
              />
              <Stack.Screen
                name="app-preference"
                options={{ title: "App Preferences", headerBackTitle: "Back" }}
              />
           
              <Stack.Screen
                name="(classes)"
                options={{
                   headerShown: false
                  
                   }}
              />
            </Stack>

            {/* Status bar theme */}
            <StatusBar style={isDark ? "light" : "dark"} />
          </NavigationThemeProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaView>
  );
}
