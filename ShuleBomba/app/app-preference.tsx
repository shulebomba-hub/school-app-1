import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Card, Divider, RadioButton } from "react-native-paper";
import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

const AppPreferenceScreen = () => {
  const router = useRouter();
  const { themeMode, setThemeMode, theme: theme_obj } = useTheme();

  const handleThemeChange = async (selectedTheme: "light" | "dark" | "system") => {
    await setThemeMode(selectedTheme);
    Alert.alert("Theme Updated", `Theme changed to ${selectedTheme} mode`);
  };

  const permissions = [
    {
      name: "Camera",
      icon: "📷",
      description: "Access to device camera for taking profile photos and attendance snapshots",
      used: true,
    },
    {
      name: "Photo Library",
      icon: "🖼️",
      description: "Access to your photo library to upload profile pictures and class materials",
      used: true,
    },
    {
      name: "Notifications",
      icon: "🔔",
      description: "Send you reminders about attendance, class schedules, and important updates",
      used: false,
    },
    {
      name: "Contacts",
      icon: "👥",
      description: "Access to contact information for managing student and staff records",
      used: false,
    },
    {
      name: "Calendar",
      icon: "📅",
      description: "Sync class schedules and attendance records with your calendar",
      used: true,
    },
    {
      name: "Files",
      icon: "📄",
      description: "Store and manage class documents, roll calls, and reports locally",
      used: true,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme_obj.background }}
    >
      <View style={[styles.screen, { backgroundColor: theme_obj.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={theme_obj.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme_obj.text }]}>App Preferences</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Theme Section */}
        <Card style={[styles.section, { backgroundColor: theme_obj.card }]}>
          <View style={styles.sectionTitle}>
            <Text style={[styles.title, { color: theme_obj.text }]}>App Theme</Text>
            <Text style={[styles.subtitle, { color: theme_obj.text }]}>Choose your preferred theme</Text>
          </View>
          <Divider />

          {/* Light Theme Option */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleThemeChange("light")}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: theme_obj.text }]}>☀️ Light Mode</Text>
              <Text style={[styles.optionDesc, { color: theme_obj.text }]}>
                Bright interface for daytime use
              </Text>
            </View>
            <RadioButton
              value="light"
              status={themeMode === "light" ? "checked" : "unchecked"}
              onPress={() => handleThemeChange("light")}
            />
          </TouchableOpacity>

          <Divider style={{ marginVertical: 0 }} />

          {/* Dark Theme Option */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleThemeChange("dark")}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: theme_obj.text }]}>🌙 Dark Mode</Text>
              <Text style={[styles.optionDesc, { color: theme_obj.text }]}>
                Dark interface for low-light environments
              </Text>
            </View>
            <RadioButton
              value="dark"
              status={themeMode === "dark" ? "checked" : "unchecked"}
              onPress={() => handleThemeChange("dark")}
            />
          </TouchableOpacity>

          <Divider style={{ marginVertical: 0 }} />

          {/* System Theme Option */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleThemeChange("system")}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: theme_obj.text }]}>🖥️ System Default</Text>
              <Text style={[styles.optionDesc, { color: theme_obj.text }]}>
                Follow your device settings
              </Text>
            </View>
            <RadioButton
              value="system"
              status={themeMode === "system" ? "checked" : "unchecked"}
              onPress={() => handleThemeChange("system")}
            />
          </TouchableOpacity>
        </Card>

        {/* Permissions Section */}
        <Card style={[styles.section, { backgroundColor: theme_obj.card }]}>
          <View style={styles.sectionTitle}>
            <Text style={[styles.title, { color: theme_obj.text }]}>App Permissions</Text>
            <Text style={[styles.subtitle, { color: theme_obj.text }]}>Permissions used by Shule Bomba</Text>
          </View>
          <Divider />

          {permissions.map((permission, index) => (
            <View key={permission.name}>
              <View style={styles.permissionRow}>
                <View style={styles.permissionIcon}>
                  <Text style={styles.iconText}>{permission.icon}</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={[styles.permissionName, { color: theme_obj.text }]}>
                    {permission.name}
                  </Text>
                  <Text style={[styles.permissionDesc, { color: theme_obj.text }]}>
                    {permission.description}
                  </Text>
                  {permission.used && (
                    <Text style={styles.usedBadge}>✓ Currently in use</Text>
                  )}
                  {!permission.used && (
                    <Text style={styles.unusedBadge}>○ Not currently used</Text>
                  )}
                </View>
              </View>
              {index < permissions.length - 1 && <Divider style={{ marginVertical: 0 }} />}
            </View>
          ))}
        </Card>

        {/* Info Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme_obj.text }]}>
            Shule Bomba respects your privacy. We only use these permissions to provide you with the best classroom management experience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  optionDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  permissionRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  permissionIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  permissionContent: {
    flex: 1,
  },
  permissionName: {
    fontSize: 15,
    fontWeight: "600",
  },
  permissionDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 18,
  },
  usedBadge: {
    fontSize: 11,
    color: "#22c55e",
    fontWeight: "600",
    marginTop: 6,
  },
  unusedBadge: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 6,
  },
  footer: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "center",
  },
});

export default AppPreferenceScreen;
