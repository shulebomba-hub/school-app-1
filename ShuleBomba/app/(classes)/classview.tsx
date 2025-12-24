import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { rootStore } from "@/components/models";

export default function Home() {
  const router = useRouter();
  const { selectedDarasa } = rootStore;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Here Lists of Students of Selected Class will appear......</Text>
      {selectedDarasa?.students.map((student, idx) => {
        return (
          <View key={idx}>
            <Text>{student.full_name}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/add-student")}
      >
        <Ionicons name="add" size={28} color="#ffff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "green",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
