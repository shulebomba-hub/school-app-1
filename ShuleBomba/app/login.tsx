import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import { PaperProvider, TextInput } from "react-native-paper";
import { rootStore } from "@/components/models";

export default function Login() {
  const router = useRouter();
  const { setAuthUser } = rootStore;

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");

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

  const nextStep = () => {
    setError("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleLogin = async () => {
    if (!username || !password || !phone || !schoolName || !className) {
      setError("Please complete all steps");
      return;
    }

    try {
      setAuthUser({
        username,
        password,
        phone,
        school_name: schoolName,
        class_name: className,
      });

      router.replace("/(tabs)");
    } catch {
      setError("Login failed. Try again.");
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
        <Text style={styles.title}>Step {step} of 3</Text>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <TextInput
              label="Username"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Next" onPress={nextStep} />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <TextInput
              label="Phone Number"
              mode="outlined"
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.row}>
              <Button title="Back" onPress={prevStep} />
              <Button title="Next" onPress={nextStep} />
              
            </View>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <TextInput
              label="School Name"
              mode="outlined"
              value={schoolName}
              onChangeText={setSchoolName}
            />
            <TextInput
              label="Class Name"
              mode="outlined"
              value={className}
              onChangeText={setClassName}
            />
            <View style={styles.row}>
              <Button title="Back" onPress={prevStep} />
              <Button title="Finish & Login" onPress={handleLogin} />
            </View>
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
        
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
function getItem(arg0: string) {
  throw new Error("Function not implemented.");
}

