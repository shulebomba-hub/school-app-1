import { View, Text, TouchableOpacity, StyleSheet, TextInput ,ScrollView , useColorScheme, Image } from "react-native"
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import {DataTable,Modal,Button} from "react-native-paper";
import React,{ useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ClassHomeScreen = observer(() => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark"
  const { selectedDarasa,selectedStudent } = rootStore
  const [visible, setVisible] = useState(false);
  
  const onSelectStudent =  (student: any) => {
    rootStore.setSelectedStudent(student.id);
    setVisible(true);
  };
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#111" : "#f5f5f5ff",
  };


  const onDeleteStudent=(student: any)=>{
    if(!selectedStudent) return;
    rootStore.setSelectedStudent(null);
    rootStore.selectedDarasa?.removeStudent(student.id);  
    
    setVisible(false);

  };

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }
  if (selectedDarasa.students.length === 0) {
    return (
      <View style={[styles.emptyRoot, { backgroundColor: theme.background }]}> 
        <Image
          source={require("../../assets/images/appIcon.png")}
          style={styles.emptyImage}
        />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>No students yet</Text>
        <Text style={[styles.emptySubtitle, { color: theme.text }]}>You haven't added any students to {selectedDarasa.name}. Add students to start tracking attendance and performance.</Text>
        <View style={styles.emptyActions}>
          <Button mode="contained" onPress={() => router.push("/add-student")}>
            Add Student
          </Button>
        </View>
      </View>
    );
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
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>name</Text>
            <TextInput
              style={styles.textInput}
              value={selectedStudent?.full_name || ""}
              onChangeText={(value)=>{
                selectedStudent?.setFullName(value);
              }}
              
            />  
            <View style={styles.modalButton}> 
            <Button mode="contained" onPress={() => setVisible(false)}>
              Save
            </Button>
            <Button mode="contained" buttonColor="red" onPress={() => onDeleteStudent(selectedStudent) }>
              Delete
            </Button>
            </View>
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
  modalButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Empty-state styles
  emptyRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyImage: {
    width: 140,
    height: 140,
    marginBottom: 18,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 360,
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default ClassHomeScreen
