import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { HelloWave } from "@/components/hello-wave";
import { Card, Button, FAB } from "react-native-paper";
import { DeleteIcon, PenLine } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Router, useRouter } from "expo-router";
import { getItem } from "./storage/localStorage";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [savedDarasa, setSavedDarasa] = useState<string[]>([]);
  const loadInitialState = async () => {
    try {
      const raw = await getItem("savedDarasa");
      if (raw != null) {
        setSavedDarasa(JSON.parse(raw));
      }
    } catch (err) {
      console.warn("loadInitialState error", err);
    }
  };

  useEffect(() => {
    loadInitialState();
  }, []);
  const router = useRouter();
  const onClassView = () => {
    router.push("/(classes)/classview");
  };
  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Content>
          <Text>IYUNGA TECHNICAL SCHOOL</Text>
        </Card.Content>
      </Card>
      <Card onPress={onClassView}>
        <Card.Content>
          <Text>Form one</Text>
          <Text>Class content</Text>
        </Card.Content>
        <Card.Actions>
          <PenLine />
          <DeleteIcon />
        </Card.Actions>
      </Card>
      {savedDarasa.map((item: string, index: number) => (
        <Card>
          <Card.Content>
            <TouchableOpacity onPress={() => {}}>
              <View key={`${item}-${index}`}>
                <Text>
                  {index + 1}. {item}
                </Text>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
      {/* Content */}
      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/(tabs)/addclass")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "green",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
