import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import { Divider } from "react-native-paper"
import React from "react"

const ClassHomeScreen = observer(() => {
  const router = useRouter()
  const { selectedDarasa } = rootStore

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Students in {selectedDarasa.name}
      </Text>

      {selectedDarasa.students.map(student => (
        <View key={student.id} style={styles.studentRow}>
          <Text>{student.full_name}</Text>
          <Divider/>
        </View>
      ))}

      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/add-student")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
});
const styles = StyleSheet.create({
   add: { position: "absolute", bottom: 20, right: 20, backgroundColor: "green", width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center", elevation: 5, },
studentRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  paddingVertical: 12,
  paddingHorizontal: 10,
  marginVertical: 6,
  borderRadius: 12,
  elevation: 2,
}, });

export default ClassHomeScreen
