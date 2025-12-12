
import React,{useState, useEffect} from 'react';
import {Alert,View, Text, Image, ScrollView, TextInput, StyleSheet,Button, Pressable, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [newStudent, setNewstudent]=useState<string>("");
  const [savedStudents, setSavedstudents]=useState<string[]>([]);
  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number | null>(null)
  

  const addedStudents = () => {
    if (!newStudent) return;
    if(selectedStudentIdx!==null){
      const studentUpdates=[...savedStudents];
      studentUpdates[selectedStudentIdx]=newStudent;
      setSavedstudents(studentUpdates);
      
    }else{
    setSavedstudents([...savedStudents, newStudent]);
    }
    
    setNewstudent("");
  };
  const deleteStudent = (index: number) => {
    const newList = savedStudents.filter((item: string, i: number) => i !== index);
    setSavedstudents(newList);
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.title}>
        <Text> Add student </Text>
      </View>
      <View style={styles.text}>
        <Text>Full name   : </Text>
        <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          paddingVertical: 2,
        }} 
          value={newStudent}
          onChangeText={setNewstudent}
          placeholder='  student full name' 
        />
      </View>

      
        <View style={styles.add}>
        <Button onPress={addedStudents}
           title={selectedStudentIdx!==null? 'Update': 'Add'}
           color='green'
          
        />
        </View>
        
      {savedStudents.map((item: string, index: number) => (
        <Pressable
          key={index}
          style={{backgroundColor: index===selectedStudentIdx? 'grey': 'white'}}
          onPress={() => {
            if (selectedStudentIdx === index) {
              setSelectedStudentIdx(null);
              setNewstudent('');
            } else {
              setSelectedStudentIdx(index);
              setNewstudent(item);
            }
          }}
        >
          <View style={styles.list}>
            <Text>{index+1} {item}</Text>
            <TouchableOpacity onPress={() => deleteStudent(index)}>
              <Text style={{ color: "red", alignItems: "flex-end" }}>X</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      ))}
      
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);


};
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollView: {
    backgroundColor: '',
  },
  text: {
    fontSize: 42,
    padding: 2,
    marginHorizontal: 10,
    flexDirection:'row'
  },
  title:{
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:'#E9F3F3'
  },
  add:{
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
  list:{
      flexDirection: "row",
      
      justifyContent: "space-between",
      marginTop: 10

  }
  
  
});

export default App;
