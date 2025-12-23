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

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
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
      // Placeholder authentication: accept any non-empty credentials.
      // Replace this with real auth logic as needed.
      await setItem("hasLoggedIn", true);
      await setItem("user", { username });
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
