import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, ActivityIndicator ,Checkbox} from 'react-native-paper';
import {getItem, setItem, removeItem} from './storage/localstorage';
import { Appbar, Button } from 'react-native-paper';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rollcall = () => {
  const [studentView, setStudentView] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checked, setChecked]=useState<{ [key: number]: boolean }>({});

  const loadInitialState = async () => {
    try {
      const _savedDarasa = await getItem('savedDarasa');
      if (_savedDarasa) {
        const parsed = JSON.parse(_savedDarasa);
        if (Array.isArray(parsed)) {
          setStudentView(parsed);
        } else {
          setStudentView([String(parsed)]);
        }
      } else {
        setStudentView([]);
      }
    } catch (error) {
      console.error('Error loading savedDarasa:', error);
      setStudentView([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadInitialState();
  },[]);
  const toggleCheck = (index: number) => {
    setChecked(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Appbar.Header>
       <Appbar.Content title="Attendance"  />
        <Appbar.Action icon="school" subtitle={'hello'} onPress={() => {}} />
        <Appbar.Action icon='card' onPress={() => {}} />
        <Appbar.Action icon='comment' onPress={() => {}} />
    </Appbar.Header>
      {studentView.length === 0 ? (
        <Text>No saved data</Text>
      ) : (
        studentView.map((item: any, index: number) => {
          const display = typeof item === 'string' ? item : item?.name ?? item?.title ?? JSON.stringify(item);
          return (
            <View style={styles.list} key={index}>
              <Text style={styles.index}>{index + 1}.</Text>
              <Text style={styles.itemText}>{display}</Text>
              <Checkbox
              status={checked[index] ? 'checked' : 'unchecked'}
              onPress={() => toggleCheck(index)}
            />
            </View>
          );
        })
      )}
      <Button icon="clock" mode="
      " onPress={() => console.log('Pressed')}>
      Save
    </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  list:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    gap: 8

  }
  ,
  index: { width: 28, fontWeight: '600' },
  itemText: { flex: 1 }
});

export default Rollcall;
