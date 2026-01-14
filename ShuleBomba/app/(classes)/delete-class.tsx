import React from "react";
import { Alert, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Platform } from "react-native";
import { rootStore } from "@/components/models";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft } from "lucide-react-native";

export default function DeleteNotification() {
  const router = useRouter();
  const { theme } = useTheme();
  const { selectedDarasa } = rootStore;

  const onDeleteDarasa = (darasa: any) => {
    if (!darasa) return;
    rootStore.setSelectedDarasa(null);
    rootStore.removeDarasa(darasa.id);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this class?");
      if (confirmed) {
        onDeleteDarasa(selectedDarasa);
        router.push("/");
      }
      return;
    }

    Alert.alert(
      "Delete class",
      "Are you sure you want to delete this class? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDeleteDarasa(selectedDarasa);
            router.push("/");
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Delete Class</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.className, { color: theme.text }]}>{selectedDarasa?.name || "Unnamed class"}</Text>
        <Text style={[styles.classInfo, { color: theme.text }]}>This will permanently remove the class and all its students.</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.cancelButton, { borderColor: theme.text }]} onPress={() => router.back()}>
            <Text style={{ color: theme.text }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={{ color: '#fff' }}>Delete Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 12 },
  content: { padding: 12, borderRadius: 10 },
  className: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  classInfo: { fontSize: 14, marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { padding: 12, borderRadius: 8, borderWidth: 1, flex: 1, alignItems: 'center', marginRight: 8 },
  deleteButton: { padding: 12, borderRadius: 8, backgroundColor: '#EF4444', flex: 1, alignItems: 'center' },
});

