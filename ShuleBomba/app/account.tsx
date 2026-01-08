import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Button, Alert, Pressable, View as RNView} from "react-native";
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
  const { authUser,setAuthUser,avatar,setAvatar } = rootStore;
  const { theme } = useTheme();
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
  return (
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
       <View style={styles.screen}>
         <Divider/>
         <Text variant="bodyLarge">Personal Information</Text>
         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
           <TextInput
             mode="outlined"
             label="username"
             value={authUser?.username}
             onChangeText={value=>setAuthUser(value)}
           />
           <TextInput
             mode="outlined"
             label="phone number"
             value={authUser?.phone}
           />
         </View>
    <TextInput
    mode="outlined"
    label="School name"
    value={authUser?.school_name}
    
    />
    <View style={styles.button}>
      <Button title="SAVE CHANGES"/>
    </View>
     
    
    </View>
    </ScrollView>

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
    backgroundColor: "#F6F7F9",
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