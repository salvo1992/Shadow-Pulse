import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { login } from '../../utils/authHelpers';
interface Props {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Simula login locale (verrà sostituito con Firebase)
   const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      onLoginSuccess?.();
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Errore', error?.message ?? 'Login fallito');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accedi</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />
     <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: { margin: 24, backgroundColor: '#222a', borderRadius: 20, padding: 24, alignItems: 'center' },
  input: { width: 240, padding: 12, borderBottomWidth: 1, borderColor: '#bbb', marginVertical: 12, backgroundColor: '#fff', borderRadius: 8 },
  button: { backgroundColor: '#00c2ff', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 20, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  title: { fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 18 }
});
