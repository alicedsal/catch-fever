import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { isUncEmail } from '@/lib/unc-email';

export default function SignInScreen() {
  const theme = useTheme();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode() {
    const cleanEmail = email.trim().toLowerCase();
    if (!isUncEmail(cleanEmail)) {
      setError('use your unc email (anything ending in unc.edu).');
      return;
    }

    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email: cleanEmail });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setEmail(cleanEmail);
      setStep('code');
    }
  }

  async function verifyCode() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: 'email' });
    setLoading(false);

    // on success, AuthProvider gets the new session and the router opens the app
    if (error) {
      setError(error.message);
    }
  }

  const inputStyle = [styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ThemedText type="title">fever</ThemedText>

        {step === 'email' ? (
          <>
            <ThemedText themeColor="textSecondary">sign in with your unc email.</ThemedText>
            <TextInput
              style={inputStyle}
              placeholder="onyen@unc.edu"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
            />
            <Pressable style={styles.button} onPress={sendCode} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>send code</ThemedText>}
            </Pressable>
          </>
        ) : (
          <>
            <ThemedText themeColor="textSecondary">we sent a code to {email}.</ThemedText>
            <TextInput
              style={inputStyle}
              placeholder="123456"
              placeholderTextColor={theme.textSecondary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              maxLength={8}
            />
            <Pressable style={styles.button} onPress={verifyCode} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>verify</ThemedText>}
            </Pressable>
            <Pressable onPress={() => { setStep('email'); setCode(''); setError(null); }}>
              <ThemedText type="link">use a different email</ThemedText>
            </Pressable>
          </>
        )}

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24, gap: 16 },
  input: { borderRadius: 12, padding: 14, fontSize: 16 },
  button: { backgroundColor: '#208AEF', borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#E5484D' },
});