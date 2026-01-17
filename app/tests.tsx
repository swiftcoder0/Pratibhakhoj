import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const TESTS = [
  {
    key: 'Vertical Jump',
    icon: 'arrow-up-circle-outline',
    desc: 'Measure explosive leg power',
  },
  {
    key: 'Sit-ups',
    icon: 'body-outline',
    desc: 'Test core strength',
  },
  {
    key: 'Push-ups',
    icon: 'fitness-outline',
    desc: 'Upper body endurance',
  },
  {
    key: 'Shuttle Run',
    icon: 'walk-outline',
    desc: 'Speed & agility',
  },
];

export default function TestSelectionScreen() {
  const params = useLocalSearchParams();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const goNext = () => {
    if (!selectedTest) return;

    router.push({
      pathname: '/instructions',
      params: {
        ...params,
        test: selectedTest,
      },
    });
  };

  return (
    <View style={styles.container}>
  
      <View style={styles.profileRow}>
        {params.photoUri ? (
          <Image
            source={{ uri: params.photoUri as string }}
            style={styles.avatar}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={50} color="#94a3b8" />
        )}

        <View>
          <Text style={styles.name}>{params.name}</Text>
          <Text style={styles.sub}>Select a test</Text>
        </View>
      </View>

      {/* Test Cards */}
      <View style={styles.list}>
        {TESTS.map((test) => (
          <Pressable
            key={test.key}
            style={[
              styles.card,
              selectedTest === test.key && styles.cardActive,
            ]}
            onPress={() => setSelectedTest(test.key)}
          >
            <Ionicons
              name={test.icon as any}
              size={28}
              color={selectedTest === test.key ? '#fff' : '#2563eb'}
            />
            <View style={styles.cardText}>
              <Text
                style={[
                  styles.cardTitle,
                  selectedTest === test.key && { color: '#fff' },
                ]}
              >
                {test.key}
              </Text>
              <Text
                style={[
                  styles.cardDesc,
                  selectedTest === test.key && { color: '#e0e7ff' },
                ]}
              >
                {test.desc}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      
      <Pressable
        style={[
          styles.continueBtn,
          !selectedTest && { opacity: 0.5 },
        ]}
        disabled={!selectedTest}
        onPress={goNext}
      >
        <Text style={styles.continueText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },

  sub: {
    fontSize: 14,
    color: '#64748b',
  },

  list: {
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
  },

  cardActive: {
    backgroundColor: '#2563eb',
  },

  cardText: {
    marginLeft: 14,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },

  cardDesc: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },

  continueBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
