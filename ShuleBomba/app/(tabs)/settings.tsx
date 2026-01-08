import React from "react";
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { BookOpen, ChevronRight, Info, ListChecksIcon, SlidersHorizontalIcon, Trash2Icon, User2Icon } from "lucide-react-native"; 
import { View, Text, Image } from "react-native";
import { rootStore } from "@/components/models";
import { Card, Divider } from "react-native-paper";
import { useRouter} from "expo-router";
import { useTheme } from "@/context/ThemeContext";


export default function Account() {
  const {resetStore, setAvatar,avatar} = rootStore;
  const router=useRouter();
  const { theme } = useTheme();

  const OnDeleteAccount = () => {
     // Implement account deletion logic here
    if (Platform.OS === "web") {
          const confirmed = window.confirm("Are you sure you want to delete your account? ,This action cannot be undone, and all your data will be lost.");
    
          if (confirmed) {
            resetStore()
            router.replace("/");
          } 
        } else {
          Alert.alert(
            "Confirm Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone, and all your data will be lost.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  resetStore();
                  router.replace("/");
                },
              },
            ]
          );
        }
   

   
  };
  const onAbout=()=>{
    router.push("/about-app")
  }

   

  const { authUser } = rootStore;
  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        >
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Card style={{ marginBottom: 20, padding: 16, borderRadius: 16, elevation: 3 }}>      
      <TouchableOpacity style={[styles.item,]} >
      <View>
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require("../../assets/images/appIcon.png")
        }
        style={styles.avatar}
      />
     </View>
      <View style={styles.user}>
      <Text style={[styles.title, { color: "black"}]}>{authUser?.username ?? "Username"}</Text>
      <Text style={[styles.subtitle, { color: "black" }]}>{authUser?.school_name ?? "School Name"}</Text>
      </View>
       
      </TouchableOpacity>
      </Card>
      <Card style={[styles.section, { backgroundColor: theme.card }]}>
      <TouchableOpacity style={styles.item} onPress={()=>{router.push("/account")}}>
      <View style={[styles.iconWrapper, { backgroundColor: "#E0F2FE" }]}>
      <User2Icon size={20} color="#0284C7" />   
      </View>

      <View style={[styles.textWrapper,]}>
      <Text style={[styles.title,{color:theme.text}]}>My Profile</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Edit profile</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />

      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.item} onPress={()=>router.push("/manage-madarasa")}>
      <View style={[styles.iconWrapper, { backgroundColor: "#E8F5E9" }]}>
      <BookOpen size={20} color="#2E7D32" />
      </View>

      <View style={styles.textWrapper}>
      <Text style={[styles.title,{color:theme.text}]}>Manage Classes</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Add / Edit / Delete classes</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />  

      <TouchableOpacity style={styles.item}>
      <View style={[styles.iconWrapper, { backgroundColor: "#FFF7ED" }]}>
      <ListChecksIcon size={20} color="#F97316" />      
      </View>

      <View style={styles.textWrapper}>
      <Text style={[styles.title,{color:theme.text}]}>Attendance settings</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Roll call rules</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.item} onPress={() => router.push("/app-preference")}>
      <View style={[styles.iconWrapper, { backgroundColor: "#F3E8FF" }]}>
      <SlidersHorizontalIcon size={20} color="#7C3AED" />
      </View>

      <View style={styles.textWrapper}>
      <Text style={[styles.title,{color:theme.text}]}>App preference</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Themes, Notifications</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />

      <TouchableOpacity style={styles.item} onPress={onAbout}>
      <View style={[styles.iconWrapper, { backgroundColor: "#ECFEFF" }]}>
      <Info size={20} color="#0891B2" />
      </View>

      <View style={styles.textWrapper}>
      <Text style={[styles.title,{color:theme.text}]}>About App</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Version, Terms of Service</Text>  
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />

      <TouchableOpacity style={styles.item} onPress={OnDeleteAccount}>
      <View style={[styles.iconWrapper, { backgroundColor: "#FFE4E6" }]}>
      <Trash2Icon size={20} color="#EF4444" />
      </View>

      <View style={styles.textWrapper}>
      <Text style={[styles.title,{color:theme.text}]}>Delete Account</Text>
      <Text style={[styles.subtitle ,{color:theme.text}]}>Delete your account permanently</Text>  
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
      
      </Card>
    </View>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  section: {
    borderRadius: 10,
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
    marginLeft: 30,
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "cover",
    backgroundColor: "#c4d4f5ff",
  }
});