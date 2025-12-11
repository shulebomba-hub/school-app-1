import React,{useState, useEffect} from 'react';
import {Alert,View, Text, Image, ScrollView, TextInput, StyleSheet,Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [darasa, setDarasa]=useState("");
  const [savedDarasa, setSaveddarasa]=useState([])
  const addedClasses=()=>{
    if (!darasa) return;
    setSaveddarasa([...savedDarasa, darasa]);
    setDarasa("");
  
   
  

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
});
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
           title='Add'
        />
        </View>
        {savedDarasa.flatMap((item, index) => (
        <Text key={index} style={{ marginTop: 10 }}>
          {item}
        </Text>
      ))}
        
      
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);


};

export default App;