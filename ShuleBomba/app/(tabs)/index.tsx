import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"
import { Card } from "react-native-paper"
import { DeleteIcon, PenLine } from "lucide-react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react"

const HomeScreen = observer(() => {
  const { darasas, setSelectedDarasa, authUser } = rootStore
  const router = useRouter()

  const onClassView = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/classview")
  }

  return (
    <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ flex: 1 ,padding: 16}}>
      <Card>
        <Card.Content>
          <Text>{authUser?.school_name.toUpperCase()}</Text>
        </Card.Content>
      </Card>

      {darasas.map(darasa => (
        <Card key={darasa.id} onPress={() => onClassView(darasa)}>
          <Card.Content>
            <Text>{darasa.name}</Text>
            <Text>{darasa.students.length} Students</Text>
          </Card.Content>

          <Card.Actions>
            <PenLine size={18} />
          </Card.Actions>
        </Card>
      ))}

      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/(tabs)/addclass")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
});
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
       width: 56, height: 56, 
       borderRadius: 28, 
       justifyContent: "center", 
       alignItems: "center",
        elevation: 5,
    }, 
});

export default HomeScreen
