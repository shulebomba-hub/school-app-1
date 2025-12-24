import React from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";

const AttendanceSummaryScreen = observer(() => {
  const date = new Date();
  const students = [];
  return (
    <View style={{ padding: 20 }}>
      {/* Header */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Attendance Summary
      </Text>

      <Text>Date: {date}</Text>

      {/* Stats */}
      {/* <View style={{ marginVertical: 15 }}>
        <Text>Total Students: {totalStudents}</Text>
        <Text>Present: {presentCount}</Text>
        <Text>Absent: {absentCount}</Text>
        <Text>Sick: {rootStore.attendance.sickCount}</Text>
      </View> */}

      {/* List 
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 8,
              borderBottomWidth: 0.5,
            }}
          >
            <Text>{item.name}</Text> */}
      {/*<Text
              style={{
                color:
                  item.status === "present"
                    ? "green"
                    : item.status === "sick"
                    ? "orange"
                    : "red",
              }}
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
        )}
      />*/}
    </View>
  );
});

export default AttendanceSummaryScreen;
