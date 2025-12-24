import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getItem, setItem } from "./(tabs)/storage/localStorage";
import { PaperProvider, TextInput } from "react-native-paper";
import { rootStore } from "@/components/models";

export default function Login() {
  const router = useRouter();
  const { setAuthUser, authUser } = rootStore;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const { darasas, addDarasa, selectedDarasa, setSelectedDarasa } = rootStore;
  const [school_name, setSchool_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const hasLoggedIn = await getItem("hasLoggedIni");
      if (hasLoggedIn) {
        router.replace("/(tabs)");
        return;
      }
      setLoading(false);
    })();
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      setAuthUser({
        username,

        school_name,
        phone,
        password,
      });
      router.replace("/(tabs)");
    } catch (e) {
      setError("Login failed. Try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to ShuleBomba</Text>
        <TextInput
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label="Phone number"
          value={phone}
          mode="outlined"
          onChangeText={setPhone}
        />
        <TextInput
          label="School name"
          value={school_name}
          mode="outlined"
          onChangeText={setSchool_name}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.button}>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },

  button: { marginTop: 8 },
  error: { color: "red", marginBottom: 8 },
});
