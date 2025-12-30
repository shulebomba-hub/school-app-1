import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const AttendanceScreen = observer(() => {
  const { selectedDarasa } = rootStore;

 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };

  const showTimepicker = () => {
    setMode("time");
    setShow(true);
  };

  if (!selectedDarasa) {
    return <Text>No class selected</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Students in {selectedDarasa.name}
      </Text>

      <Button onPress={showDatepicker}>Show date picker</Button>
      <Button onPress={showTimepicker}>Show time picker</Button>

      <Text>Selected: {date.toLocaleString()}</Text>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour
          onChange={onChange}
        />
      )}


      {selectedDarasa.students.map((student) => (
        <View key={student.id} style={styles.row}>
          <Text>{student.full_name}</Text>

          <Button mode="outlined">Present</Button>
          <Button mode="outlined">Absent</Button>
          <Button mode="outlined">Sick</Button>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
  },
});

export default AttendanceScreen;
