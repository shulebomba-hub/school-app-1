import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { BookOpen, ChevronRight, Info, ListChecksIcon, SlidersHorizontalIcon, Trash2Icon, User2Icon } from "lucide-react-native"; 
import { View, Text } from "react-native";
import { rootStore } from "@/components/models";
import { Divider } from "react-native-paper";


export default function Account() {
  const { authUser } = rootStore;
  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        > 
    <View style={styles.screen}>
    <TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#E0F2FE" }]}>
    <User2Icon size={20} color="#0284C7" />   
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>My Profile</Text>
    <Text style={styles.subtitle}>Edit profile</Text>
  </View>

  <ChevronRight size={20} color="#9CA3AF" />

</TouchableOpacity>
<Divider style={styles.divider} />
<TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#E8F5E9" }]}>
    <BookOpen size={20} color="#2E7D32" />
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>Manage Classes</Text>
    <Text style={styles.subtitle}>Add / Edit / Delete classes</Text>
  </View>

  <ChevronRight size={20} color="#9CA3AF" />
</TouchableOpacity>
<Divider style={styles.divider} />  

<TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#FFF7ED" }]}>
    <ListChecksIcon size={20} color="#F97316" />      
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>Attendance settings</Text>
    <Text style={styles.subtitle}>Roll call rules</Text>
  </View>

  <ChevronRight size={20} color="#9CA3AF" />
</TouchableOpacity>
<Divider style={styles.divider} />
<TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#F3E8FF" }]}>
    <SlidersHorizontalIcon size={20} color="#7C3AED" />
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>App preference</Text>
    <Text style={styles.subtitle}>Themes, Notifications</Text>
  </View>

  <ChevronRight size={20} color="#9CA3AF" />
</TouchableOpacity>
<Divider style={styles.divider} />

<TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#ECFEFF" }]}>
    <Info size={20} color="#0891B2" />
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>About App</Text>
    <Text style={styles.subtitle}>Version, Terms of Service</Text>  
  </View>

  <ChevronRight size={20} color="#9CA3AF" />
</TouchableOpacity>
<Divider style={styles.divider} />

<TouchableOpacity style={styles.item}>
  <View style={[styles.iconWrapper, { backgroundColor: "#FFE4E6" }]}>
    <Trash2Icon size={20} color="#EF4444" />
  </View>

  <View style={styles.textWrapper}>
    <Text style={styles.title}>Delete Account</Text>
    <Text style={styles.subtitle}>Delete your account permanently</Text>  
  </View>

  <ChevronRight size={20} color="#9CA3AF" />
</TouchableOpacity>
<Divider style={styles.divider} />

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
});