import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getItem, setItem } from "./(tabs)/storage/localStorage";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const hasLoggedIn = await getItem("hasLoggedIn");
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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ShuleBomba</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: { marginTop: 8 },
  error: { color: "red", marginBottom: 8 },
});
