import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform ,Alert} from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button, DataTable, RadioButton } from "react-native-paper";
import { DatePickerModal } from 'react-native-paper-dates';
import dayjs from "dayjs";


const AttendanceScreen = observer(() => {
  const {selectedDate, setSelectedDate, saveAttendance, attendances} = rootStore;
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if(!selectedDate){
      setSelectedDate(dayjs().format("DD-MM-YYYY"));
    }
  }, [selectedDate]);
  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setSelectedDate(dayjs(params.date).format("DD-MM-YYYY"));
    },
    [setOpen]
  );
  const { selectedDarasa } = rootStore;

 
  
  if (!selectedDarasa) {
    return <Text>No class selected</Text>;
  };
  
  const SaveAlert = () => {
      if (Platform.OS === "web") {
        const confirmed = window.confirm("This action cannot be undone. Are you sure you want to save attendance for this date?");
  
        if (confirmed) {
          saveAttendance();
        }
       
      } else {
        Alert.alert(
          "Save Attendance",
          "Are you sure you want to save attendance for this date?. This action cannot be undone.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Save",
              style: "destructive",
              onPress: () => {saveAttendance();},
            },
          ]
        );
      }
    };

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          {!selectedDate?"Pick a date": `Selected date: ${selectedDate}`}
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={new Date()}
          onConfirm={onConfirmSingle}
        />
      <DataTable.Header>
        <DataTable.Title>Full name</DataTable.Title>
        <DataTable.Title numeric>Present</DataTable.Title>
        <DataTable.Title numeric>Absent</DataTable.Title>
        <DataTable.Title numeric>Sick</DataTable.Title>
      </DataTable.Header>
      {selectedDarasa.students.map((student) => (
       <DataTable.Row key={`${student.id}`}>
          <DataTable.Cell>{student.full_name}</DataTable.Cell>
          <DataTable.Cell numeric>
            <RadioButton
              value="present"
              color="green"
              disabled={student.isSaved}
              status={ student.status === 'present' ? 'checked' : 'unchecked' }
              onPress={() => student.setAttendanceStatus('present', selectedDate!)}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
             <RadioButton
             disabled={student.isSaved}
              value="absent"
              color="red"
              status={ student.status === 'absent' ? 'checked' : 'unchecked' }
              onPress={() => student.setAttendanceStatus('absent', selectedDate!)}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric> 
            <RadioButton
            disabled={student.isSaved}
              value="sick"
              color="yellow"
              status={ student.status === 'sick' ? 'checked' : 'unchecked' }
              onPress={() => student.setAttendanceStatus('sick', selectedDate!)}
            />
            </DataTable.Cell>
        </DataTable.Row>))}
       
        <Button 
        mode="contained" 
        onPress={SaveAlert}
        style={{marginTop:20}}
        >
      Save Attendance
        </Button>
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
  width:150
},

  pickers:{
    flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 20,

  },
});

export default AttendanceScreen;
