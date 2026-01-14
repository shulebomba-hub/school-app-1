import { View, Text, TouchableOpacity, StyleSheet, TextInput ,ScrollView , useColorScheme, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useTheme } from "@/context/ThemeContext";
import { rootStore } from "@/components/models";
import {Modal,Button} from "react-native-paper";
import React,{ useState } from "react";
import { BookOpen, ChevronLeft, SaveAll, Trash2, UserPlus2, Users } from "lucide-react-native";

const ClassHomeScreen = observer(() => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedDarasa,selectedStudent } = rootStore
  const [visible, setVisible] = useState(false);
  
  const onSelectStudent =  (student: any) => {
    rootStore.setSelectedStudent(student.id);
    setVisible(true);
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
          <Button mode="contained" onPress={() => router.replace("/home")}>
           Return Home
          </Button>
        </View>
      </View>
    );
  }

  return (

    <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>

      <View style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>
      
      <View style={styles.classCardLeft}>
          <View style={[styles.classIcon, { backgroundColor: 'transparent' }]}>
            <ChevronLeft size={24} color="#fff" onPress={()=>router.replace("/home")}/>
          </View>
          <View style={styles.classInfo}>
            <Text style={[styles.className, { color: theme.text }]}>
              {selectedDarasa.name}
            </Text>
            <View style={styles.classDetailRow}>
              <Users size={14} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text style={[styles.classDetail, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                {selectedDarasa.students.length} {selectedDarasa.students.length === 1 ? 'student' : 'students'}
              </Text>
          </View>
        </View>
      </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
        <Link href="/(classes)/attendance?skipConfirm=true">
          <View style={[styles.iconview, isDark ? styles.iconviewDark : styles.iconviewLight]}>
            <Users size={30} color={isDark ? '#FFFFFF' : '#0A3BFF'} />
            <Text style={{ color: isDark ? '#E5E7EB' : '#374151' }}>Attendance</Text>
        </View>
        </Link>

        <Link href="/(classes)/add-student?skipConfirm=true">
          <View style={[styles.iconview, isDark ? styles.iconviewDark : styles.iconviewLight]}>
            <UserPlus2 size={30} color={isDark ? '#FFFFFF' : '#0A3BFF'} />
            <Text style={{ color: isDark ? '#E5E7EB' : '#374151' }}>Add Student</Text>
        </View>
        </Link>

        <Link href="/(classes)/saved-rolcall?skipConfirm=true">
          <View style={[styles.iconview, isDark ? styles.iconviewDark : styles.iconviewLight]}>
            <SaveAll size={30} color={isDark ? '#34D399' : '#10B981'} />
            <Text style={{ color: isDark ? '#E5E7EB' : '#374151' }}>Saved Attendance</Text>
        </View>
        </Link>

        <Link href="/(classes)/delete-class?skipConfirm=true">
          <View style={[styles.iconview, isDark ? styles.iconviewDark : styles.iconviewLight]}>
            <Trash2 size={30} color={isDark ? '#F87171' : '#EF4444'} />
            <Text style={{ color: isDark ? '#E5E7EB' : '#374151', alignItems: 'center' }}>Delete class</Text>
        </View>
        </Link>
        
      </View>
      </View>


    
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
    >
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 ,color: theme.text, fontSize: 18}}>
        Students in {selectedDarasa.name}
      </Text>

      <View style={styles.listHeaderRow}>
        <Text style={[styles.listHeaderText, { color: theme.text }]}>Registration No.</Text>
        <Text style={[styles.listHeaderText, { color: theme.text }]}>Full Name</Text>
      </View>

      {selectedDarasa.students.map(student => (
        <TouchableOpacity
          key={`${student.id}`}
          style={[styles.studentCard, isDark ? styles.studentCardDark : styles.studentCardLight]}
          onPress={() => onSelectStudent(student)}
        >
          <Text style={[styles.studentId, { color: theme.text }]}>{student.id}</Text>
          <Text style={[styles.studentName, { color: theme.text}]}>{student.full_name}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={[styles.bottomSheet, { paddingBottom: 20 + insets.bottom }] }>
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
    </View>
  )
});
const styles = StyleSheet.create({
  header:{
    
    marginLeft:15,
    marginRight:15,
    marginBottom:20,

  },
  iconview:{
    alignItems:"center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom:10,
  },
  iconviewDark: {
    backgroundColor: '#2B2B2B',
    borderColor: '#444C56',
  },
  iconviewLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  headerDark: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  headerLight: {
    backgroundColor: 'transparent',
    padding: 6,
  },

  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  listHeaderText: {
    fontSize: 13,
    fontWeight: '600',
  },

  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  studentCardDark: {
    backgroundColor: '#222227',
  },
  studentCardLight: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  studentId: {
    fontSize: 14,
    fontWeight: '600',
  },
  studentName: {
    fontSize: 14,
    color: '#6b7280',
    justifyContent: 'flex-start',
  },

  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
    justifyContent: "flex-start",
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
  classCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  classIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  classDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classDetail: {
    fontSize: 12,
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
