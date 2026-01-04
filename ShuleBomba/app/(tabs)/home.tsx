import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useColorScheme } from "react-native"
import { Card, Divider } from "react-native-paper"
import { DeleteIcon,  PenLine } from "lucide-react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react";


const HomeScreen = observer(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" 
  const { darasas, setSelectedDarasa, authUser } = rootStore
  const router = useRouter();
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#9b9da0ff" : "#f5f5f5ff",
};

  const onClassView = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/classview")
  }

  return (
    <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={{ flex: 1 , backgroundColor: theme.background }}>
      <Divider/>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>{authUser?.school_name?.toUpperCase()?? "IYUNGA TECHNICAL SCHOOL"}</Text>
      </View> 
  
       

      {darasas.map(darasa => (
        <><Card key={darasa.id} onPress={() => onClassView(darasa)} style={{ marginTop: 16, backgroundColor: theme.card }}>
          <Card.Content>
            <Text style={{ color: theme.text }}>{darasa.name}</Text>
            <Text style={{ color: theme.text }}>{darasa.students.length} Students</Text>
            
          </Card.Content>

          <Card.Actions>
            <PenLine size={18} color={theme.text}/>
           
          </Card.Actions>
        </Card></>
        
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
