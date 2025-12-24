import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { rootStore } from "@/components/models";
import { Provider, observer } from "mobx-react";

const AddClassScreen = () => {
  const [name, setName] = useState("");
  const { darasas } = rootStore;
  const addClass = () => {
    rootStore.addDarasa(name);
    setName("");
  };

  return (
    <Provider rootStore={rootStore}>
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

        <View>
          {darasas.map((darasa: any, idx: any) => {
            return (
              <View key={idx}>
                <Text>{darasa.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Provider>
  );
};

export default AddClassScreen;
