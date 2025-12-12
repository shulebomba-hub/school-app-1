
import React,{useState, useEffect} from 'react';
import {Alert,View, Text, Image, ScrollView, TextInput, StyleSheet,Button,Pressable, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [darasa, setDarasa]=useState<string>("");
  const [savedDarasa, setSaveddarasa]=useState<string[]>([])
  const [selectedDarasaIdx, setSelectedDarasaIdx] = useState<number | null>(null)
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
  const deleteClass = (index: number) => {
    const newList = savedDarasa.filter((darasa: string, i: number) => i !== index);
    setSaveddarasa(newList);
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
        {savedDarasa.map((item: string, index: number) => (
        <Pressable
          key={index}
          style={{backgroundColor: index===selectedDarasaIdx? 'grey': 'white'}}
          onPress={() => {
            if (selectedDarasaIdx === index) {
              setSelectedDarasaIdx(null);
              setDarasa('');
            } else {
              setSelectedDarasaIdx(index);
              setDarasa(item);
            }
          }}
        >
          <View style={styles.list}>
            <Text>{index+1} {item}</Text>
            <TouchableOpacity onPress={() => deleteClass(index)}>
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
    padding: 20,
  },
  title:{
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#E9F3F3'
  },
  list:{
    flexDirection: "row",
    justifyContent: "space-between",
     marginTop: 10

  }
})

export default App;
