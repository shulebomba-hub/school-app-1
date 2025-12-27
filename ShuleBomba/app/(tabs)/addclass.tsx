import React, { useState } from "react"
import { View, TextInput, Button, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid/non-secure"
import { rootStore } from "@/components/models"

const AddClassScreen = observer(() => {
  const [name, setName] = useState("")
  const { darasas } = rootStore

  const addClass = () => {
    if (!name.trim()) return

    rootStore.addDarasa(nanoid(), name.trim())
    setName("")
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Class name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <Button title="Add Class" onPress={addClass} />

      <View style={{ marginTop: 20 }}>
        {darasas.map((darasa) => (
          <View key={darasa.id}>
            <Text>{darasa.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
})

export default AddClassScreen
