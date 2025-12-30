import React, { useState ,useEffect} from "react";
import { Alert, View } from "react-native";
import { Platform } from "react-native";
import { Router, useRouter } from "expo-router";
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
  React.useEffect(() => 
    { Delete();

     }, []);
      return null; // nothing to render, only alert }
}
