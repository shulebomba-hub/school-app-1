import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useColorScheme, Platform, Alert } from "react-native"
import { Button, Card, Divider, DataTable} from "react-native-paper"
import { Edit, PlusIcon, Trash2 } from "lucide-react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react";


const ManageMadarasa = observer(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" 
  const { darasas, setSelectedDarasa, selectedDarasa,authUser } = rootStore
  const router = useRouter();
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#9b9da0ff" : "#f5f5f5ff",
};
  if(!authUser){
    router.replace("/")
  };
  const onClassView = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/add-student")
  };
  const onEdit = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/classview")
  };
  const onDeleteDarasa=(selectedDarasa: any)=>{
      rootStore.setSelectedDarasa(null);
      rootStore.removeDarasa(selectedDarasa.id);  
    };
  const Delete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this class?");

      if (confirmed) {
        onDeleteDarasa(selectedDarasa);
        router.push("/");
      } 
    } else {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this class?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              onDeleteDarasa(selectedDarasa);
              router.push("/");
            },
          },
        ]
      );
    }
  };


  return (
    <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={[{ flex: 1 , backgroundColor: theme.background }]}>
      <Button mode="outlined" onPress={()=>router.push("/(tabs)/addclass")}><PlusIcon/>Add Class</Button>
      
      {darasas.map(darasa => (
        <View key={darasa.id} style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.className}>{darasa.name}</Text>
          <Text style={styles.students}>{darasa.students.length} Students  <Edit size={10} onPress={()=>onEdit(darasa)}/></Text>
        </View>
        
        <View style={styles.right}>
            <TouchableOpacity style={styles.button} onPress={()=>onClassView(darasa)}>
              <Text style={styles.buttonText}>Add Students</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={Delete}>
              <MaterialIcons name="delete" size={22} color="#000" />
            </TouchableOpacity>
        </View>
      
      </View>
      ))}
     

      
    </View>
    </ScrollView>
  )
});
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  left: {
    flex: 1,
  },

  className: {
    fontSize: 16,
    fontWeight: "600",
  },

  students: {
    fontSize: 13,
    color: "#666",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#6A5ACD", // purple
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
  },

  delete: {
    padding: 6,
  },
});

export default ManageMadarasa
