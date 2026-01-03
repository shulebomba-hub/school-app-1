import { View, Text, TouchableOpacity, StyleSheet, TextInput ,ScrollView} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import { Divider ,DataTable,Modal,Button} from "react-native-paper"
import React,{ useState } from "react"

const ClassHomeScreen = observer(() => {
  const router = useRouter()
  const { selectedDarasa,selectedStudent } = rootStore
  const [visible, setVisible] = useState(false);
  
  const onSelectStudent =  (student: any) => {
    rootStore.setSelectedStudent(student.id);
    setVisible(true);
  };
  const onDeleteStudent=(student: any)=>{
    if(!selectedStudent) return;
    rootStore.selectedDarasa?.removeStudent(student.id);  
    rootStore.setSelectedStudent(null);
    setVisible(false);

  };

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }

  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
    >
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Students in {selectedDarasa.name}
      </Text>

      <DataTable.Header>
        <DataTable.Title>Registration No.</DataTable.Title>
        <DataTable.Title>Full Name</DataTable.Title>
             
      </DataTable.Header>

      {selectedDarasa.students.map(student => (
        <DataTable.Row key={`${student.id}`}>
          <DataTable.Cell>{student.id}</DataTable.Cell>
          <DataTable.Cell onPress={() => onSelectStudent(student) }>{student.full_name}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/add-student")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <TextInput
              style={styles.textInput}
              value={selectedStudent?.full_name || ""}
              onChangeText={(value)=>{
                selectedStudent?.setFullName(value);
              }}
              
            />  
            <Button onPress={() => setVisible(false)}>
              Save
            </Button>
            <Button mode="contained" buttonColor="red" onPress={() => onDeleteStudent(selectedStudent) }>
              Delete
            </Button>
          </View>
        </View>
      </Modal>
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
     width: 56, 
     height: 56, 
     borderRadius: 28,
     justifyContent: "center", 
     alignItems: "center", 
     elevation: 5, 
    },
studentRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 12,
  paddingHorizontal: 10,
  marginVertical: 6,
},
textInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
},
overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 150, // short screen height
  },
 });

export default ClassHomeScreen
