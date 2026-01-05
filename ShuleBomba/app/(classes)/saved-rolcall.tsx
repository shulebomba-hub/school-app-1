import React, { useState } from "react";
import { View, Text, StyleSheet,ScrollView , useColorScheme} from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button, DataTable, RadioButton } from "react-native-paper";
import { DatePickerModal } from 'react-native-paper-dates';
import dayjs from "dayjs";


const AttendanceScreen = observer(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark"
  const theme = {
    background: isDark ? "#000" : "#fff",
    text: isDark ? "#fff" : "#000",
    card: isDark ? "#111" : "#f5f5f5ff",
  };  
  const {selectedDate, setSelectedDate, attendances} = rootStore;
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setSelectedDate(dayjs(params.date).format("DD-MM-YYYY"));
    },
    [setOpen]
  );
  const { selectedDarasa } = rootStore;

 
  
  if (!selectedDarasa) {
    return <Text style={{ color: theme.text } }>No class selected</Text>;
  }

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          {!selectedDate?"Pick a date": `Selected Date: ${selectedDate}`}
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={new Date()}
          onConfirm={onConfirmSingle}
        />
      <DataTable.Header style={{ backgroundColor: theme.card }}>
        <DataTable.Title >Full name</DataTable.Title>
        <DataTable.Title numeric>Present</DataTable.Title>
        <DataTable.Title numeric>Absent</DataTable.Title>
        <DataTable.Title numeric>Sick</DataTable.Title>
      </DataTable.Header>
      {selectedDarasa.students.map((student) => (
       <DataTable.Row key={`${student.id}`}>
          <DataTable.Cell><Text>{student.full_name}</Text></DataTable.Cell>
          <DataTable.Cell numeric>
            <RadioButton
              color="green"
              value="present"
              status={ student.status === 'present' ? 'checked' : 'unchecked' }

            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
             <RadioButton
              value="absent"
              color="red"
              status={ student.status === 'absent' ? 'checked' : 'unchecked' }

            />
          </DataTable.Cell>
          <DataTable.Cell numeric> 
            <RadioButton
              color="blue"
              value="sick"
              status={ student.status === 'sick' ? 'checked' : 'unchecked' }
            />
            </DataTable.Cell>
        </DataTable.Row>))}
    </View>
    </ScrollView>
  );
});



export default AttendanceScreen;
