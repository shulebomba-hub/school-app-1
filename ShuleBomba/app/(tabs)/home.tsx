import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Animated, Easing, SafeAreaView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from 'react';
import { Card } from "react-native-paper"
import { ArrowRight, BookOpen, Users } from "lucide-react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { observer } from "mobx-react-lite"
import { rootStore } from "@/components/models"
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


const HomeScreen = observer(() => {
  const { theme, isDark } = useTheme();
  const { darasas, setSelectedDarasa, authUser } = rootStore
  const router = useRouter();

  const onClassView = (darasa:any) => {
    setSelectedDarasa(darasa.id)
    router.push("/(classes)/classview")
  }
  if(!authUser){
    router.replace("/")
  }

  const [ctaSeen, setCtaSeen] = useState<boolean | null>(null);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkSeen = async () => {
      try {
        const v = await AsyncStorage.getItem('home_cta_seen');
        setCtaSeen(v === '1');
      } catch (e) {
        setCtaSeen(false);
      }
    };
    checkSeen();
  }, []);

  useEffect(() => {
    if (ctaSeen === false) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulse.setValue(1);
    }
  }, [ctaSeen, pulse]);

  const markCtaSeen = async () => {
    try {
      await AsyncStorage.setItem('home_cta_seen', '1');
    } catch (e) {}
    setCtaSeen(true);
  };

  const onPressAddFirst = async () => {
    await markCtaSeen();
    router.push("/(tabs)/addclass");
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Fixed Header Section */}
      <View style={[styles.headerSection, { backgroundColor: theme.card, borderBottomColor: isDark ? '#333' : '#e5e7eb' }]}>
        <View style={styles.headerContent}>
          <BookOpen size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={[styles.schoolName, { color: theme.text }]}>
              {authUser?.school_name?.toUpperCase() ?? "YOUR SCHOOL"}
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Attendance Management System
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.background }}
      >
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          {/* Stats Section */}
          {darasas.length > 0 && (
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.statNumber}>{darasas.length}</Text>
                <Text style={styles.statLabel}>Classes</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statNumber}>{darasas.reduce((sum, d) => sum + d.students.length, 0)}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
            </View>
          )}

          {darasas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require("../../assets/images/appIcon.png")}
                style={styles.emptyImage}
              />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>Welcome to {authUser?.school_name ?? "Your School"} 👋</Text>
              <Text style={[styles.emptySubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                You haven't created any classes yet. Let's add your first class to get started — it's quick and easy!
              </Text>
              <Animated.View style={{ transform: [{ scale: pulse }] }}>
                <TouchableOpacity style={styles.ctaButton} onPress={onPressAddFirst}>
                  <Text style={styles.ctaText}>+ Add Your First Class</Text>
                </TouchableOpacity>
              </Animated.View>
              {ctaSeen === false && (
                <View style={styles.tooltip} pointerEvents="none">
                  <Text style={styles.tooltipText}>Tap here to create your first class</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.classesContainer}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>My Classes</Text>
                <Text style={[styles.classCount, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                  {darasas.length} {darasas.length === 1 ? 'class' : 'classes'}
                </Text>
              </View>

              {darasas.map((darasa, index) => (
                <TouchableOpacity
                  key={darasa.id}
                  onPress={() => onClassView(darasa)}
                  style={[styles.classCard, { backgroundColor: theme.card, borderColor: isDark ? '#333' : '#e5e7eb' }]}
                  activeOpacity={0.7}
                >
                  <View style={styles.classCardLeft}>
                    <View style={[styles.classIcon, { backgroundColor: '#3B82F6' }]}>
                      <BookOpen size={24} color="#fff" />
                    </View>
                    <View style={styles.classInfo}>
                      <Text style={[styles.className, { color: theme.text }]}>
                        {darasa.name}
                      </Text>
                      <View style={styles.classDetailRow}>
                        <Users size={14} color={isDark ? '#9ca3af' : '#6b7280'} />
                        <Text style={[styles.classDetail, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                          {darasa.students.length} {darasa.students.length === 1 ? 'student' : 'students'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ArrowRight size={20} color={isDark ? '#9ca3af' : '#9ca3af'} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {darasas.length > 0 && (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/(tabs)/addclass")}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
});

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  classesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  classCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  classCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  classIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  classDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classDetail: {
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 48,
    flex: 1,
  },
  emptyImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 24,
    resizeMode: 'contain',
    opacity: 0.95,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 300,
  },
  ctaButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  tooltip: {
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    maxWidth: 280,
    alignSelf: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  addButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
});

export default HomeScreen
