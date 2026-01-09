import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { HomeIcon, Settings2Icon } from "lucide-react-native";


export default function TabLayout() {
  const { isDark, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDark ? '#6B7280' : '#9CA3AF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: isDark ? '#333' : '#e5e7eb',       
          
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Classes",
          tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings2Icon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="addclass"
        options={{
          title: "Add / Edit Class Name",
          href: null,
        }}
      />
    </Tabs>
  );
}
