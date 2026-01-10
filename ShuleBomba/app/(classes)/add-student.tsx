import React, { useState } from "react"
import { View , TextInput, Button, Text, ScrollView, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import { useTheme } from "@/context/ThemeContext"

const AddStudentScreen = observer(() => {
  const [name, setName] = useState("")
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const { selectedDarasa } = rootStore;
  const { theme } = useTheme();  

  const onAddStudent = () => {
    if (!name.trim()) return
    selectedDarasa?.addStudent(name.trim())
    setName("")
  }

  const handleStudentPress = (studentId: string, studentName: string) => {
    setSelectedStudentId(studentId)
    setName(studentName)
  }

  const handleUpdate = () => {
    if (!selectedStudentId || !name.trim()) return

    rootStore.updateStudent(selectedStudentId, name.trim())
    setName("")
    setSelectedStudentId(null)
  }

  const handleAddOrUpdate = () => {
    if (selectedStudentId) {
      handleUpdate()
    } else {
      onAddStudent()
    }
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

      <Button title={selectedStudentId ? "Update Student" : "Add Student"} onPress={handleAddOrUpdate} />

      <View>
        {selectedDarasa.students.map(student => (
          <Pressable 
            key={student.id}  
            style={[
              { marginTop: 10 }, 
              { 
                backgroundColor: selectedStudentId === student.id ? theme.primary : theme.card, 
                padding: 10
              }
            ]}
            onPress={() => handleStudentPress(student.id, student.full_name)}
          >
            <Text style={{ color: selectedStudentId === student.id ? "#fff" : theme.text }}>{student.full_name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
    </ScrollView>
  )
})

export default AddStudentScreen
