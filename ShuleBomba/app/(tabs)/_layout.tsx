import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { HomeIcon, Settings2, Settings2Icon } from "lucide-react-native";
import { rootStore } from "@/components/models";
import { Provider } from "mobx-react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider rootstore={rootStore}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "ShuleBomba",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Settings2Icon color={color} />,
          }}
        />
        <Tabs.Screen
          name="addclass"
          options={{
            title: "Add / Edit Class Name",
            href: null,
            tabBarIcon: ({ color }) => <Settings2Icon color={color} />,
          }}
        />
      </Tabs>
    </Provider>
  );
}
