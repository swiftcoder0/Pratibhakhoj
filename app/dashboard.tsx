import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const params = useLocalSearchParams();
  const test = (params.test as string) || 'Shuttle Run';

  const dataMap: any = {
    'Shuttle Run': {
      my: '9.8 sec',
      top: '8.9 sec',
      diff: '+0.9 sec',
      criteria: [
        'Speed & agility measured',
        'Lower time gives higher score',
        'AI verified timing',
      ],
    },
    'Sit-ups': {
      my: '32 reps / 60 sec',
      top: '45 reps',
      diff: '-13 reps',
      criteria: [
        'Total valid repetitions counted',
        'Full range motion required',
        'Incorrect reps ignored',
      ],
    },
    'Push-ups': {
      my: '28 reps',
      top: '40 reps',
      diff: '-12 reps',
      criteria: [
        'Upper body endurance test',
        'Form-based rep validation',
        'Speed shown only if consistent',
      ],
    },
    'Vertical Jump': {
      my: '42 cm',
      top: '58 cm',
      diff: '-16 cm',
      criteria: [
        'Explosive leg power measured',
        'Vertical height only',
        'Side jumps invalid',
      ],
    },
  };

  const info = dataMap[test];

  return (
    <ScrollView style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My Assessment</Text>
        <Text style={styles.testName}>{test}</Text>

        <Text style={styles.score}>72.4</Text>
        <Text style={styles.scoreLabel}>Overall Performance Score</Text>

        <View style={styles.verified}>
          <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
          <Text style={styles.verifiedText}>AI Verified</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Test Performance</Text>

        <Text style={styles.metric}>My Performance: {info.my}</Text>
        <Text style={styles.metric}>Top Performer: {info.top}</Text>
        <Text style={styles.metric}>Difference: {info.diff}</Text>
      </View>

  
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Scoring Criteria</Text>
        {info.criteria.map((c: string, i: number) => (
          <Text key={i} style={styles.criteria}>• {c}</Text>
        ))}
      </View>

      {/* Ranking yh haii*/}
      <View style={styles.rankCard}>
        <Text style={styles.rankTitle}>My Ranking</Text>
        <Text style={styles.rankText}>Rank 124 • Top 15%</Text>
      </View>

      {/* CTA */}
      <Pressable style={styles.moreBtn}>
        <Text style={styles.moreText}>Know more rankings →</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    padding: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064e3b',
  },

  testName: {
    fontSize: 14,
    color: '#047857',
    marginTop: 4,
  },

  score: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#16a34a',
    marginVertical: 6,
  },

  scoreLabel: {
    color: '#64748b',
  },

  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  verifiedText: {
    marginLeft: 6,
    color: '#16a34a',
  },

  metric: {
    fontSize: 15,
    marginTop: 6,
    color: '#065f46',
  },

  criteria: {
    fontSize: 14,
    color: '#334155',
    marginTop: 6,
  },

  rankCard: {
    backgroundColor: '#dcfce7',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  rankTitle: {
    fontWeight: '600',
    color: '#064e3b',
  },

  rankText: {
    marginTop: 4,
    color: '#047857',
  },

  moreBtn: {
    alignItems: 'center',
    marginVertical: 20,
  },

  moreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
