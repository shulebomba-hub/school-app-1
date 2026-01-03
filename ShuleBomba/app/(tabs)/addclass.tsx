import React, { useState } from "react"
import { View, TextInput, Button, Text, ScrollView , useColorScheme} from "react-native"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid/non-secure"
import { rootStore } from "@/components/models";

const AddClassScreen = observer(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" 
  const [name, setName] = useState("")
  const { darasas } = rootStore

  const addClass = () => {
    if (!name.trim()) return

    rootStore.addDarasa(nanoid(), name.trim())
    setName("")
  };
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#111" : "#f5f5f5",
};

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ padding: 20, backgroundColor: theme.background ,}}>
      <TextInput
        placeholder="Class name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          color: theme.text,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <Button title="Add Class" onPress={addClass} style={{ backgroundColor: theme.card }} />

      <View style={[{ marginTop: 20 }, { backgroundColor: theme.card , padding: 10, borderRadius: 5} ]}>
        {darasas.map((darasa) => (
          <View key={darasa.id}>
            <Text>{darasa.name}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  )
})

export default AddClassScreen
