import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Alert } from "react-native"
import { useTheme } from "@/context/ThemeContext";
import { Button, Card, Divider, DataTable} from "react-native-paper"
import { Edit, PlusIcon, Trash2, ChevronLeft } from "lucide-react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react";


const ManageMadarasa = observer(() => {
  const { theme, isDark } = useTheme();
  const { darasas, setSelectedDarasa, selectedDarasa,authUser } = rootStore
  const router = useRouter();
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
  const onDeleteDarasa = (darasa: any) => {
    if (!darasa) return;
    rootStore.setSelectedDarasa(null);
    rootStore.removeDarasa(darasa.id);
  };

  const confirmDeleteDarasa = (darasa: any) => {
    if (!darasa) return;
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this class?");
      if (confirmed) {
        onDeleteDarasa(darasa);
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
            onPress: () => onDeleteDarasa(darasa),
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Manage Classes</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
      <Button mode="outlined" onPress={()=>router.push("/(tabs)/addclass")}><PlusIcon/>Add Class</Button>
      </View>
      {darasas.map(darasa => (
        <View key={darasa.id} style={styles.row}>
        <View style={styles.left}>
          <Text style={[styles.className, { color: theme.text }]}>{darasa.name}</Text>
          <Text style={[styles.students,{color: theme.text}]}>{darasa.students.length} Students  <Edit size={10} onPress={()=>onEdit(darasa)}/></Text>
        </View>
        
        <View style={styles.right}>
            <TouchableOpacity style={styles.button} onPress={()=>onClassView(darasa)}>
              <Text style={styles.buttonText}>Add Students</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={()=>confirmDeleteDarasa(darasa)}>
              <MaterialIcons name="delete" size={22} color={theme.text} />
            </TouchableOpacity>
        </View>
      
      </View>
      ))}
     

      
    </View>
    </ScrollView>
  )
});
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
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
