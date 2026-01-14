import React, { useState } from "react";
import { View, Text, StyleSheet,ScrollView , Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button, DataTable, RadioButton } from "react-native-paper";
import { DatePickerModal } from 'react-native-paper-dates';
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";


const AttendanceScreen = observer(() => {
  const { theme, isDark } = useTheme();  
  const {selectedDate, setSelectedDate, attendances} = rootStore;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 12, color: theme.text }}>Saved Attendance</Text>
        </View>
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
        <DataTable.Title ><Text style={{ color: theme.text }}>Full name</Text></DataTable.Title>
        <DataTable.Title numeric><Text style={{ color: theme.text }}>Present</Text></DataTable.Title>
        <DataTable.Title numeric><Text style={{ color: theme.text }}>Absent</Text></DataTable.Title>
        <DataTable.Title numeric><Text style={{ color: theme.text }}>Sick</Text></DataTable.Title>
      </DataTable.Header>
      {selectedDarasa.students.map((student) => (
       <DataTable.Row key={`${student.id}`}>
          <DataTable.Cell><Text style={{ color: theme.text }}>{student.full_name}</Text></DataTable.Cell>
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
