import React, { useState } from "react"
import { View , TextInput, Button, Text, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import { useTheme } from "@/context/ThemeContext"

const AddStudentScreen = observer(() => {
  const [name, setName] = useState("")
  const { selectedDarasa } = rootStore;
  const { theme } = useTheme();  

  const onAddStudent = () => {
    if (!name.trim()) return
    selectedDarasa?.addStudent(name.trim())
    setName("")
  }

  if (!selectedDarasa) {
    return <Text style={{ color: theme.text }}>No class selected</Text>
  }

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ padding: 20, backgroundColor: theme.background, flex: 1 }}>
      <TextInput
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          color: theme.text,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <Button title="Add Student" onPress={onAddStudent} />

      <View>
        {selectedDarasa.students.map(student => (
          <View key={student.id}  style={[{ marginTop: 10 }, { backgroundColor: theme.card , padding: 10}]} >
            <Text style={{ color: theme.text }}>{student.full_name}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  )
})

export default AddStudentScreen
