import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Parse JSON if stored data is an object
      return JSON.parse(value);
    }
    return null; // Key does not exist
  } catch (error) {
    console.error("Error reading value:", error);
    return null;
  }
};
export const setItem = async (key, value) => {
  try {
    // Convert non-string values to JSON
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data stored successfully for key: ${key}`);
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
};
