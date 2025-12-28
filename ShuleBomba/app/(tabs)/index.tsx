import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper"
import { DeleteIcon, PenLine } from "lucide-react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"

const HomeScreen = observer(() => {
  const { darasas, setSelectedDarasa, authUser } = rootStore
  const router = useRouter()

  const onClassView = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/classview")
  }

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Content>
          <Text>{authUser?.school_name}</Text>
        </Card.Content>
      </Card>

      {darasas.map(darasa => (
        <Card key={darasa.id} onPress={() => onClassView(darasa)}>
          <Card.Content>
            <Text>{darasa.name}</Text>
            <Text>Class content</Text>
          </Card.Content>

          <Card.Actions>
            <PenLine size={18} />
            <DeleteIcon size={18} />
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
