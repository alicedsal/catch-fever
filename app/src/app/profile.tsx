import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const userId = session?.user.id;

  const [displayName, setDisplayName] = useState('');
  const [classYear, setClassYear] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // load the saved profile, if there is one
  useEffect(() => {
    if (!userId) return;
    supabase
      .from('profiles')
      .select('display_name, class_year, bio')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setMessage(error.message);
        if (data) {
          setDisplayName(data.display_name);
          setClassYear(data.class_year ? String(data.class_year) : '');
          setBio(data.bio ?? '');
        }
        setLoading(false);
      });
  }, [userId]);

  async function save() {
    if (!userId) return;
    if (!displayName.trim()) {
      setMessage('add your name.');
      return;
    }

    setSaving(true);
    setMessage(null);
    // upsert = create the row the first time, update it after that
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      display_name: displayName.trim(),
      class_year: classYear ? Number(classYear) : null,
      bio: bio.trim() || null,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setMessage(error ? error.message : 'saved ✓');
  }

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const inputStyle = [styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="smallBold">name</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="what should matches call you?"
          placeholderTextColor={theme.textSecondary}
          value={displayName}
          onChangeText={setDisplayName}
          maxLength={40}
        />

        <ThemedText type="smallBold">class year</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="2028"
          placeholderTextColor={theme.textSecondary}
          value={classYear}
          onChangeText={setClassYear}
          keyboardType="number-pad"
          maxLength={4}
        />

        <ThemedText type="smallBold">bio</ThemedText>
        <TextInput
          style={[inputStyle, styles.bio]}
          placeholder="a few words about you"
          placeholderTextColor={theme.textSecondary}
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={300}
        />

        <Pressable style={styles.button} onPress={save} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>save</ThemedText>}
        </Pressable>

        {message && <ThemedText themeColor="textSecondary">{message}</ThemedText>}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 24, gap: 10 },
  input: { borderRadius: 12, padding: 14, fontSize: 16 },
  bio: { minHeight: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#208AEF', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});