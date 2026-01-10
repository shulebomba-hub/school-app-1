import React, { useState } from "react"
import { View, Button, Text, ScrollView, Pressable } from "react-native"
import { useTheme } from "@/context/ThemeContext";
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid/non-secure"
import { rootStore } from "@/components/models";
import { TextInput } from "react-native-paper";

const AddClassScreen = observer(() => {
  const { theme } = useTheme();
  const [name, setName] = useState("")
  const [selectedDarasaId, setSelectedDarasaId] = useState<string | null>(null)
  const { darasas } = rootStore

  const addClass = () => {
    if (!name.trim()) return

    rootStore.addDarasa(nanoid(), name.trim())
    setName("")
  };

  const handleDarasaPress = (darasaId: string, darasaName: string) => {
    setSelectedDarasaId(darasaId)
    setName(darasaName)
  };

  const handleUpdate = () => {
    if (!selectedDarasaId || !name.trim()) return

    rootStore.updateDarasa(selectedDarasaId, name.trim())
    setName("")
    setSelectedDarasaId(null)
  };

  const handleAddOrUpdate = () => {
    if (selectedDarasaId) {
      handleUpdate()
    } else {
      addClass()
    }
  };

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ padding: 20,flex: 1, backgroundColor: theme.background }}>
      <TextInput
        label="Class name"
        value={name}
        mode="outlined"
        onChangeText={setName}
        style={{
          
          borderColor: "#ccc",
          color: theme.text,
          marginBottom: 10,
        }}
      />

      <Button title={selectedDarasaId ? "Update Class" : "Add Class"} onPress={handleAddOrUpdate}/>

      <View >
        {darasas.map((darasa) => (
          <Pressable 
            key={darasa.id} 
            style={[
              { marginTop: 5 }, 
              { 
                backgroundColor: selectedDarasaId === darasa.id ? theme.primary : theme.card, 
                padding: 10, 
                borderRadius: 5
              } 
            ]} 
            onPress={() => handleDarasaPress(darasa.id, darasa.name)}
          >  
          
            <Text style={{ color: selectedDarasaId === darasa.id ? "#fff" : theme.text }}>{darasa.name}</Text>
          
          </Pressable>
        ))}
      </View>
    </View>
    </ScrollView>
  )
})

export default AddClassScreen
