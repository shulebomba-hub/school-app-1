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
      
      <View style={styles.pickers}>
      <Button onPress={showDatepicker} mode="outlined" >Pick a Date</Button>
      <Button onPress={showTimepicker} mode="outlined" >Pick a Time</Button>
      </View>

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
  <View key={student.id} style={styles.studentRow}>
    
    {/* Student name */}
    <Text style={styles.name}>{student.full_name}</Text>

    {/* Attendance buttons */}
    <View style={styles.buttons}>
      <Button mode="outlined" compact>P</Button>
      <Button mode="outlined" compact>A</Button>
      <Button mode="outlined" compact>S</Button>
    </View>

  </View>
))}

    </View>
  );
});

const styles = StyleSheet.create({
 studentRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#f9f9f9",
  paddingVertical: 12,
  paddingHorizontal: 10,
  marginVertical: 6,
  borderRadius: 12,
  elevation: 2,
},

name: {
  flex: 1,
  fontSize: 16,
},

buttons: {
  flexDirection: "row",
  gap: 10,
  width: 150,
  justifyContent: "space-between",
},

  pickers:{
    flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 20,

  },
});

export default AttendanceScreen;
