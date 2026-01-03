import React, { useState ,useEffect} from "react";
import { Alert, View } from "react-native";
import { Platform } from "react-native";
import {rootStore} from "@/components/models";
import { Router, useRouter } from "expo-router";

export default function DeleteNotification() {
  const router = useRouter();
  const {selectedDarasa}=rootStore;

  const onDeleteDarasa=(selectedDarasa: any)=>{
      if(!selectedDarasa) return;
      rootStore.setSelectedDarasa(null);
      rootStore.removeDarasa(selectedDarasa.id);  
    };
  const Delete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this?");

      if (confirmed) {
        onDeleteDarasa(selectedDarasa);
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
            onPress: () => {
              onDeleteDarasa(selectedDarasa);
              router.push("/");
            },
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
