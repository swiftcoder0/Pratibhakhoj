import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.brandBox}>
        <Ionicons name="trophy-outline" size={64} color="#2563eb" />
        <Text style={styles.title}>PratibhaKhoj</Text>
        <Text style={styles.subtitle}>
          Discover Your Sports Talent
        </Text>
      </View>

  
      <Pressable
        style={({ pressed }) => [
          styles.startBtn,
          pressed && { opacity: 0.8 },
        ]}
        onPress={() => router.push('/profile')}
      >
        <Ionicons name="play-circle-outline" size={22} color="#fff" />
        <Text style={styles.startText}> Start Assessment</Text>
      </Pressable>

      {/* Footer */}
      <Text style={styles.footer}>
        Powered by AI • Offline Friendly
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },

  brandBox: {
    alignItems: 'center',
    marginTop: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },

  startBtn: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 13,
  },
});
