import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme , Button, Alert, Pressable} from "react-native";
import { BookOpen, ChevronRight, Info, ListChecksIcon, SlidersHorizontalIcon, Trash2Icon, User2Icon } from "lucide-react-native"; 
import { View,Image} from "react-native";
import { rootStore } from "@/components/models";
import { Divider,Avatar, Card, TextInput, Text } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

export default function Account() {
  const colorScheme = useColorScheme();
  const { authUser,setAuthUser } = rootStore;
  const [image, setImage] = useState<string | null>(null);

  const isDark = colorScheme === "light" ? false : true;
  const theme = {
  background: isDark ? "#000" : "#fff",
  text: isDark ? "#fff" : "#000",
  card: isDark ? "#111" : "#f5f5f5",
};
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        > 
         <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.avatarWrapper}>
        <Image
          source={
            image
              ? { uri: image } // ✅ picked image
              : require("../assets/avatar.png") // ✅ default favicon
          }
          style={styles.avatar}
        />
      </Pressable>
    </View>
    <View style={styles.screen}>
      <Divider/>
    <Text variant="bodyLarge">Personal Information</Text>
    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
    <TextInput
    mode="outlined"
    label="username"
    value={authUser?.username}
    onChangeText={(value)=>{
      setAuthUser(value);
      }}
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
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 6,
    marginBottom: 16,

    // Android
    elevation: 2,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  button:{
    marginTop:50,
    marginLeft:10,
    marginRight:10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginLeft: 56,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  textWrapper: {
    flex: 1,

  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  chevron: {
    marginLeft: 8,
  },
   user:{
    marginLeft: 60,
    flex: 1,
  };
  container: {
    alignItems: "center",
    justifyContent: "center",
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
});