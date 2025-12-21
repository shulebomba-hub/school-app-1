import { Image } from "expo-image";
import { Platform, StyleSheet, View, Text } from "react-native";
import { HelloWave } from "@/components/hello-wave";

export default function HomeScreen() {
  return (
    <View>
      <View>
        <Text>IYUNGA TECHNICAL SCHOOL</Text>
      </View>
      <Text>Here List of All Classes belongs to Teacher Will Appear.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
