import { Drawer } from "expo-router/drawer"
import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react"


const DrawerLayout = observer(() => {
  const { selectedDarasa } = rootStore

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="classview"
        options={{
          title: selectedDarasa?.name ?? "Class",
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
        name="add-student"
        options={{
          title: "Add Student",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="saved-rolcall"
        options={{
          title: "Saved Data",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="delete-class"
        options={{
          title: "Delete Class",
          drawerIcon: ({ size }) => (
            <Ionicons name="trash-outline" size={size} color="red" />
          ),
        }}
      />
    </Drawer>
  )
})

export default DrawerLayout
