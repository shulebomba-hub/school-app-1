import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


const AttendanceScreen = observer(() => {
 
  const { selectedDarasa } = rootStore

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>

        Students in {selectedDarasa.name}
      </Text>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      </View>

      {selectedDarasa.students.map(student => (
        <View key={student.id} style={styles.row}>
          <Text>{student.full_name}</Text>
      
          <Button onPress={()=>{}} mode="outlined" >Present</Button> 
          <Button onPress={()=>{}} mode="outlined">Absent</Button> 
          <Button onPress={()=>{}} mode="outlined">Sick</Button>
       
        </View>
      ))}

      
    </View>
  )
});
const styles=StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    
  },
  
})

export default AttendanceScreen
