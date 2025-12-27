import React, { useState } from "react"
import { View, TextInput, Button, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"

const AddStudentScreen = observer(() => {
  const [name, setName] = useState("")
  const { selectedDarasa } = rootStore

  const onAddStudent = () => {
    if (!name.trim()) return
    selectedDarasa?.addStudent(name.trim())
    setName("")
  }

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <Button title="Add Student" onPress={onAddStudent} />

      <View style={{ marginTop: 20 }}>
        {selectedDarasa.students.map(student => (
          <View key={student.id}>
            <Text>{student.full_name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
})

export default AddStudentScreen
