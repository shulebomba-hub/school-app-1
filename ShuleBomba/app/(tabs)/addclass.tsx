import React, { useState } from "react"
import { View, TextInput, Button, Text, ScrollView } from "react-native"
import { useTheme } from "@/context/ThemeContext";
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid/non-secure"
import { rootStore } from "@/components/models";

const AddClassScreen = observer(() => {
  const { theme } = useTheme();
  const [name, setName] = useState("")
  const { darasas } = rootStore

  const addClass = () => {
    if (!name.trim()) return

    rootStore.addDarasa(nanoid(), name.trim())
    setName("")
  };

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ padding: 20,flex: 1, backgroundColor: theme.background }}>
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

      <Button title="Add Class" onPress={addClass}/>

      <View >
        {darasas.map((darasa) => (
          <View key={darasa.id} style={[{ marginTop: 5 }, { backgroundColor: theme.card , padding: 10, borderRadius: 5} ]}>
            <Text style={{ color: theme.text }}>{darasa.name}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  )
})

export default AddClassScreen
