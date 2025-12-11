import React,{useState, useEffect} from 'react';
import {Alert,View, Text, Image, ScrollView, TextInput, StyleSheet,Button, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [newStudent, setNewstudent]=useState("");
  const [savedStudents, setSavedstudents]=useState([]);
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(null)
  const addedClasses=()=>{
    if (!newStudent) return;
    if(selectedStudentIdx!==null){
      const studentUpdates=[...savedStudents];
      studentUpdates[selectedStudentIdx]=darasa;
      setSavedstudents(newStudent)
      
    }else{
    setSavedstudents([...savedStudents, newStudent]);
    }
    
    setNewstudent("");
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
        <Button onPress={addedClasses}
           title={selectedStudentIdx!==null? 'Update': 'Add'}
           color='green'
          
        />
        </View>
      {savedStudents.flatMap((item, index) => (
        <Pressable style={{backgroundColor: index===selectedStudentIdx? 'grey': 'white'}} onPress={()=>{
        if(selectedStudentIdx===index){
setSelectedStudentIdx(null);
setNewstudent('')
        }else{
          setSelectedStudentIdx(index);
          setNewstudent(item);
        }
          }} key={index}><Text style={{ marginTop: 10 }}>
         {index+1} {item}
        </Text></Pressable>
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
  
  }
  
});

export default App;
