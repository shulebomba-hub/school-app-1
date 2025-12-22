import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getItem, setItem } from "./storage/localStorage";
import { Provider as PaperProvider, TextInput } from "react-native-paper";

const DarasaScreen: React.FC = () => {
  const [darasa, setDarasa] = useState<string>("");
  const [savedDarasa, setSaveddarasa] = useState<string[]>([]);
  const [selectedDarasaIdx, setSelectedDarasaIdx] = useState<number | null>(
    null
  );

  const loadInitialState = async () => {
    try {
      const raw = await getItem("savedDarasa");
      if (raw) setSaveddarasa(JSON.parse(raw));
    } catch (err) {
      console.warn("loadInitialState error", err);
    }
  };

  useEffect(() => {
    loadInitialState();
  }, []);

  const addedClasses = () => {
    if (!darasa.trim()) return Alert.alert("Enter class name");

    if (selectedDarasaIdx !== null) {
      const newDarasa = [...savedDarasa];
      newDarasa[selectedDarasaIdx] = darasa.trim();
      setSaveddarasa(newDarasa);
      setItem("savedDarasa", JSON.stringify(newDarasa));
      setSelectedDarasaIdx(null);
    } else {
      const newList = [...savedDarasa, darasa.trim()];
      setSaveddarasa(newList);
      setItem("savedDarasa", JSON.stringify(newList));
    }

    setDarasa("");
  };

  const deleteClass = (index: number) => {
    const newList = savedDarasa.filter((_, i) => i !== index);
    setSaveddarasa(newList);
    setItem("savedDarasa", JSON.stringify(newList));
    if (selectedDarasaIdx === index) {
      setSelectedDarasaIdx(null);
      setDarasa("");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Class name:</Text>
          <TextInput
            value={darasa}
            onChangeText={setDarasa}
            mode="outlined"
            label="Class name"
          />
        </View>

        <View style={styles.add}>
          <Button
            onPress={addedClasses}
            title={selectedDarasaIdx !== null ? "Update" : "Add"}
            color="green"
          />
        </View>

        {savedDarasa.map((item: string, index: number) => (
          <Pressable
            key={`${item}-${index}`}
            style={[
              styles.row,
              index === selectedDarasaIdx ? styles.rowSelected : undefined,
            ]}
            onPress={() => {
              if (selectedDarasaIdx === index) {
                setSelectedDarasaIdx(null);
                setDarasa("");
              } else {
                setSelectedDarasaIdx(index);
                setDarasa(item);
              }
            }}
          >
            <View style={styles.list}>
              <Text style={styles.itemText}>
                {index + 1}. {item}
              </Text>
              <TouchableOpacity onPress={() => deleteClass(index)}>
                <Text style={styles.delete}>X</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { padding: 16 },
  title: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E9F3F3",
    borderRadius: 6,
    marginBottom: 12,
  },
  titleText: { fontSize: 18, fontWeight: "600" },
  inputRow: { marginBottom: 12 },
  label: { marginBottom: 6, fontSize: 14 },

  add: { marginVertical: 12, alignItems: "flex-end" },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  row: { backgroundColor: "white", paddingHorizontal: 6 },
  rowSelected: { backgroundColor: "#eee" },
  itemText: { fontSize: 16 },
  delete: { color: "red", paddingHorizontal: 8 },
});

export default DarasaScreen;
