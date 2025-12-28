import React from "react";
import { View, Text } from "react-native";
import { rootStore } from "@/components/models";


export default function Account() {
  const { authUser } = rootStore;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account Information</Text>
      <Text>{authUser?.school_name.toUpperCase()}</Text>
      <Text>{authUser?.username}</Text>
      <Text>{authUser?.phone}</Text>
            
    </View>
  );
}
