import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { register } from '../../utils/authHelpers';
interface Props {
  onRegisterSuccess?: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

   const handleRegister = async () => {
    if (password.length < 6) {
      Alert.alert('Errore', 'La password deve avere almeno 6 caratteri');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Errore', 'Le password non coincidono');
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      setLoading(false);
      onRegisterSuccess?.();
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Errore', error?.message ?? 'Registrazione fallita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrati</Text>
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
        textContentType="newPassword"
      />
      <TextInput
        style={styles.input}
        placeholder="Ripeti Password"
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        textContentType="newPassword"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrati</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: { margin: 24, backgroundColor: '#222a', borderRadius: 20, padding: 24, alignItems: 'center' },
  input: { width: 240, padding: 12, borderBottomWidth: 1, borderColor: '#bbb', marginVertical: 12, backgroundColor: '#fff', borderRadius: 8 },
  button: { backgroundColor: '#00c2ff', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 20, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  title: { fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 18 }
});

