import { Image } from "expo-image";
import { Platform, StyleSheet, View,  } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { LucideSettings2 } from "lucide-react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Divider } from "react-native-paper";
import {useColorScheme } from "react-native";
export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" 
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#9b9da0ff" : "#f5f5f5ff",
};

  return (
    
    <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}     
    >
      <View style={{ flex: 1 , backgroundColor: theme.background }}>
<Collapsible title="FAQS">
      <Collapsible title="What is ShuleBomba?">
        <ThemedText>ShuleBomba is a simple and reliable attendance management system designed for primary and secondary school teachers.
It helps teachers record, manage, and review student attendance easily — all in one place and without internet access.</ThemedText>
<ThemedText>The app is built for teachers who handle multiple classes within a single school, making daily attendance faster, organized, and stress-free.</ThemedText>
      </Collapsible>
      <Divider/>
      <Collapsible title="Aim of ShuleBomba">
        <ThemedText>1. The main aim of ShuleBomba is to:</ThemedText>
        <ThemedText>2. Simplify daily attendance taking</ThemedText>
        <ThemedText>3. Reduce paper-based attendance records</ThemedText>
        <ThemedText>4. Help teachers keep accurate and organized student data</ThemedText>
        <ThemedText>5. Save time and improve classroom management</ThemedText>
        <ThemedText>6. ShuleBomba ensures attendance records are safe, clear, and easy to access anytime, even when offline.</ThemedText>

      </Collapsible>
      <Divider/>

      <Collapsible title="How ShuleBomba works?">
        <ThemedText>ShuleBomba works fully offline, so you can use it anytime, anywhere.</ThemedText>
        <ThemedText>1. A teacher creates classes for their school</ThemedText>
        <ThemedText>2. Students are added to each class</ThemedText>
        <ThemedText>3. Attendance is taken by selecting a specific date</ThemedText>
        <ThemedText>4. All attendance records are saved securely on the device</ThemedText>
        <ThemedText>5. Saved attendance can be viewed later by class and date</ThemedText>
        <ThemedText>No internet connection is required.</ThemedText>

      </Collapsible>
      <Divider/>

      <Collapsible title="Key Features">
        <ThemedText>Manage attendance for primary and secondary schools</ThemedText>
        <ThemedText>1. One teacher can manage multiple classes</ThemedText>
        <ThemedText>2. Add, edit, or delete classes</ThemedText>
        <ThemedText>3. Add, edit, or delete students</ThemedText>
        <ThemedText>4. Pick dates when taking attendance</ThemedText>
        <ThemedText>5. View saved attendance by date</ThemedText>
        <ThemedText>6. Works 100% offline</ThemedText>
        <ThemedText>7. Option to delete all data when needed</ThemedText>
      </Collapsible>
      <Divider/>

      <Collapsible title="How to use ShuleBomba?">
        <ThemedText>1. Create a Class</ThemedText>
        <ThemedText>2. Add Students</ThemedText>
        <ThemedText>3. Take Attendance</ThemedText>
        <ThemedText>4. View Saved Attendance</ThemedText>
        <ThemedText>5. Manage Data</ThemedText>
      </Collapsible>
      <Divider/>

      <Collapsible title="Who is ShuleBomba for?">
        <ThemedText>Primary school teachers</ThemedText>
        <ThemedText>Secondary school teachers</ThemedText>
        <ThemedText>Teachers managing more than one class in the same schoo</ThemedText>
      </Collapsible>
      <Divider/>

      <Collapsible title="Why choose ShuleBomba?">
        <ThemedText>
          ShuleBomba is designed to be:
        </ThemedText>
        <ThemedText>1. Easy to use</ThemedText>
        <ThemedText>2. Fast and reliable</ThemedText>
        <ThemedText>3. Offline-friendly</ThemedText>
        <ThemedText>4. Focused on real classroom needs</ThemedText>
        <ThemedText>5. It allows teachers to focus more on teaching and less on paperwork.</ThemedText>
      </Collapsible>
      <Divider/>


      </Collapsible>
       <Divider/>
      <Collapsible title="Privacy">
        <ThemedText>
          You will set to use your password to delete / edit sensive data like
          classes , students etc.
        </ThemedText>
      </Collapsible>
       <Divider/>
       <Collapsible title="Security">
        <ThemedText>
          You will set to use your password to delete / edit sensive data like
          classes , students etc.
        </ThemedText>
        
      </Collapsible>
       <Divider/>
       </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    gap: 0,
  },
});
