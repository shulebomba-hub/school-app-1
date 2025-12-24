import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="classview"
        options={{
          title: "Form one",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="attendance"
        options={{
          title: "Attendance",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="saved-rolcall"
        options={{
          title: "Saved Roll-call",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="save-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="delete-class"
        options={{
          title: "Delete this class",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trash" size={size} color="red" />
          ),
        }}
      />
      <Drawer.Screen
        name="add-student"
        options={{
          title: "Add Student",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trash" size={size} color="red" />
          ),
        }}
      />
    </Drawer>
  );
}
