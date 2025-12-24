import React from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";

const AttendanceSummaryScreen = observer(() => {
  const date = new Date();
  const students = rootStore;
  return (
    <View>
      <Text>saved data</Text>
    </View>
  );
});

export default AttendanceSummaryScreen;
