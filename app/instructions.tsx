import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InstructionsScreen() {
  const params = useLocalSearchParams();
  const test = params.test as string;

  const instructionsMap: Record<string, { icon: string; text: string }[]> = {
    'Push-ups': [
      { icon: 'checkmark-circle-outline', text: 'Keep your body straight from head to heels' },
      { icon: 'checkmark-circle-outline', text: 'Lower chest until elbows bend at 90°' },
      { icon: 'warning-outline', text: 'Do not bend your knees or arch your back' },
      { icon: 'close-circle-outline', text: 'Incomplete reps will not be counted' },
    ],

    'Sit-ups': [
      { icon: 'checkmark-circle-outline', text: 'Lie on your back with knees bent' },
      { icon: 'checkmark-circle-outline', text: 'Lift upper body until elbows touch knees' },
      { icon: 'warning-outline', text: 'Keep feet on the ground at all times' },
      { icon: 'close-circle-outline', text: 'Half sit-ups will not be counted' },
    ],

    'Vertical Jump': [
      { icon: 'checkmark-circle-outline', text: 'Stand straight with full body visible in camera' },
      { icon: 'checkmark-circle-outline', text: 'Jump vertically using both legs together' },
      { icon: 'warning-outline', text: 'Land safely on both feet' },
      { icon: 'close-circle-outline', text: 'Side jumps or running jumps are invalid' },
    ],

    'Shuttle Run': [
      { icon: 'checkmark-circle-outline', text: 'Run back and forth between two points quickly' },
      { icon: 'checkmark-circle-outline', text: 'Turn properly at each end point' },
      { icon: 'warning-outline', text: 'Maintain speed throughout the run' },
      { icon: 'close-circle-outline', text: 'Stopping midway will affect your score' },
    ],
  };

  const instructions = instructionsMap[test] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{test} Instructions</Text>

      
      <View style={styles.card}>
        {instructions.map((item, index) => (
          <View key={index} style={styles.row}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={
                item.icon.includes('checkmark')
                  ? '#16a34a'
                  : item.icon.includes('warning')
                  ? '#f59e0b'
                  : '#dc2626'
              }
            />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </View>

      {}
      <Pressable
        style={styles.readyBtn}
        onPress={() =>
          router.push({
            pathname: '/camera',
            params,
          })
        }
      >
        <Ionicons name="camera-outline" size={22} color="#fff" />
        <Text style={styles.readyText}> I Am Ready</Text>
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f172a',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  text: {
    fontSize: 16,
    marginLeft: 12,
    color: '#334155',
    flex: 1,
  },

  readyBtn: {
    position: 'absolute',
    left: 20,
    right: 20,
    top:500,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323c50',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 8,
  },

  readyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
