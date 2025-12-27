import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/components/models";
import { Button } from "react-native-paper";

const AttendanceScreen = observer(() => {
 
  const { selectedDarasa } = rootStore

  if (!selectedDarasa) {
    return <Text>No class selected</Text>
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Students in {selectedDarasa.name}
      </Text>

      {selectedDarasa.students.map(student => (
        <View key={student.id} style={styles.row}>
          <Text>{student.full_name}</Text>
      
          <Button onPress={()=>{}} mode="outlined" >Present</Button> 
          <Button onPress={()=>{}} mode="outlined">Absent</Button> 
          <Button onPress={()=>{}} mode="outlined">Sick</Button>
       
        </View>
      ))}

      
    </View>
  )
});
const styles=StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    
  },
  
})

export default AttendanceScreen
