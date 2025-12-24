import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { rootStore } from "@/components/models";
import { observer } from "mobx-react";

const AddStudentScreen = observer(({ rootStore }) => {
  const [name, setName] = useState("");
  const { selectedDarasa, attendances } = rootStore;

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
      <Button
        title="Add Student"
        onPress={() => rootStore.selectedDarasa?.addStudent(name)}
      />

      <View>
        {selectedDarasa?.students.map((student: any, idx: any) => {
          return (
            <View key={idx}>
              <Text>{student.full_name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default AddStudentScreen;
