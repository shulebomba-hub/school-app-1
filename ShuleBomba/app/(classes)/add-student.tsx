import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { rootStore } from "@/components/models";

const AddStudentScreen = () => {
  const [name, setName] = useState("");
  const { selectedDarasa } = rootStore;

  const handleAdd = () => {
    if (name.trim() === "") {
      Alert.alert("Error", "Please enter a student name");
      return;
    }
    selectedDarasa.addStudent(name.trim());
    setName("");
    // go back to Attendance screen
  };

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
      <Button title="Add Student" onPress={handleAdd} />
    </View>
  );
};

export default AddStudentScreen;
