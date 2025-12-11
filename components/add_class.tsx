import React,{useState, useEffect} from 'react';
import {Alert,View, Text, Image, ScrollView, TextInput, StyleSheet,Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [darasa, setDarasa]=useState("");
  const [savedDarasa, setSaveddarasa]=useState([])
  const [selectedDarasaIdx, setSelectedDarasaIdx] = useState(null)
  const addedClasses=()=>{
    if (!darasa) return;
    if(selectedDarasaIdx!==null){
      const newDarasa=[...savedDarasa];
      newDarasa[selectedDarasaIdx]=darasa;
      setSaveddarasa(newDarasa)
      
    }else{
    setSaveddarasa([...savedDarasa, darasa]);
    }
    
    setDarasa("");
  };
  
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.title}>
        <Text> Add Classes </Text>
      </View>
        <View style={styles.text}>
        <Text>Class name   : 
          <TextInput 
            value={darasa}
            onChangeText={setDarasa}
            placeholder='  eg. form three' 
          />
        </Text>
        <Button onPress={addedClasses}
            title={selectedDarasaIdx!==null? 'Update': 'Add'}

        />
        </View>
        {savedDarasa.flatMap((item, index) => (
        <Pressable style={{backgroundColor: index===selectedDarasaIdx? 'grey': 'white'}} onPress={()=>{
        if(selectedDarasaIdx===index){
setSelectedDarasaIdx(null);
setDarasa('')
        }else{
          setSelectedDarasaIdx(index);
          setDarasa(item);
        
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
    padding: 20,
  },
  title:{
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#E9F3F3'
  }
})

export default App;
