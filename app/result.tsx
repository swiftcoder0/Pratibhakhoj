import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const test = params.test as string;
  const score = Number(params.score || 0);

  const getRemark = () => {
    if (score >= 75) return { text: 'Excellent', color: '#16a34a' };
    if (score >= 50) return { text: 'Good', color: '#2563eb' };
    return { text: 'Needs Improvement', color: '#dc2626' };
  };

  const remark = getRemark();

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={72} color="#16a34a" />

      <Text style={styles.title}>Test Completed</Text>

      <Text style={styles.testName}>{test}</Text>

      <Text style={styles.score}>{score}</Text>
      <Text style={styles.scoreLabel}>Final Score</Text>

      <Text style={[styles.remark, { color: remark.color }]}>
        {remark.text}
      </Text>

      <Text style={styles.summary}>
        Your performance has been successfully recorded and verified.
      </Text>

      <Pressable
        style={styles.btn}
        onPress={() =>
          router.push({
            pathname: '/dashboard',
            params,
          })
        }
      >
        <Text style={styles.btnText}>View Detailed Analysis</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#064e3b',
  },

  testName: {
    fontSize: 16,
    color: '#047857',
    marginTop: 4,
  },

  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 16,
  },

  scoreLabel: {
    color: '#64748b',
    marginBottom: 12,
  },

  remark: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 6,
  },

  summary: {
    textAlign: 'center',
    color: '#475569',
    marginVertical: 12,
  },

  btn: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
