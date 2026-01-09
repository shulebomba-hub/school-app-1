import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Button, Alert, Pressable, View as RNView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Image, Text as RNText} from "react-native";
import { rootStore } from "@/components/models";
import { Divider,Avatar, Card, TextInput, Text } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

const  AccountScreen = observer(()=> {
  const router = useRouter();
  const { authUser, avatar, setAvatar,setAuthUser } = rootStore;
  const { theme } = useTheme();
  const [username, setUsername] = useState(authUser?.username || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [schoolName, setSchoolName] = useState(authUser?.school_name || "");
  const [loading, setLoading] = useState(false);

const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    console.log(result);
    if (!result.canceled && authUser) {
      setAvatar(result.assets[0].uri);
    }
  };
  const userData = {
      username,
      phone,
      school_name: schoolName
    };
  const handleSaveChanges = () => {
    if (!authUser) return;
    setLoading(true);
    
    
    setTimeout(() => {
      setAuthUser(userData);
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
    }, 1500);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        > 
         <RNView style={[styles.header, { backgroundColor: theme.background }]}>
           <TouchableOpacity onPress={() => router.back()}>
             <ChevronLeft size={24} color={theme.text} />
           </TouchableOpacity>
           <RNText style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</RNText>
         <RNView style={{ width: 24 }} />
       </RNView>
       <View style={styles.container}>
         <Pressable onPress={pickImage} style={styles.avatarWrapper}>
           <Image
             source={
               avatar
                 ? { uri: avatar } 
                 : require("../assets/images/appIcon.png")
             }
             style={styles.avatar}
           />
         </Pressable>
         <Text>Tap to edit</Text>
       </View>
       <View style={[styles.screen, { backgroundColor: theme.background }]}>
         <Divider/>
         <Text variant="bodyLarge" style={{ color: theme.text }}>Personal Information</Text>
         <View style={{flexDirection:"row", justifyContent:"space-between", gap: 10,}}>
           <TextInput
             mode="outlined"
             label="Username"
             textColor="blue"
             value={username}
             onChangeText={setUsername}
             style={{ flex: 1, backgroundColor: theme.card }}
           />
           <TextInput
             mode="outlined"
             label="Phone Number"
             value={phone}
             textColor="blue"
             onChangeText={setPhone}
             style={{ flex: 1 ,backgroundColor: theme.card }}
             
           />
         </View>
         <TextInput
           mode="outlined"
           label="School Name"
           textColor="blue"
           value={schoolName}
           onChangeText={setSchoolName}
           style={{ marginTop: 12, backgroundColor: theme.card }}
         />
         <View style={styles.button}>
           <Button 
             title={loading ? "SAVING..." : "SAVE CHANGES"}
             onPress={handleSaveChanges}
             disabled={loading}
           />
         </View>
       </View>
    </ScrollView>
    </SafeAreaView>

  );
});
export default AccountScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
   user:{
    marginLeft: 60,
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#c6c8cdff",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderEndColor: "#ccc",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button:{
    marginTop:30,
    marginLeft:30,
    marginRight:30,
  }
});