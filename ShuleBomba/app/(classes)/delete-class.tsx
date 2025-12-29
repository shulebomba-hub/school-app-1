import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Platform } from "react-native";
import { Router, useRouter } from "expo-router";
import { Button ,Text} from "react-native-paper";
export default function DeleteNotification() {
  const router = useRouter();
  const Delete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this?");

      if (confirmed) {
        console.log("Deleted on web");
        router.push("/");
      } else {
        router.push("/");
      }
    } else {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this class?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => console.log("Deleted on mobile"),
          },
        ]
      );
    }
  };
  return (
    <View>
      <Text>
      <Button onPress={Delete} mode="outlined">
        delete
      </Button>
      </Text>
    </View>
  );
}
