import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const params = useLocalSearchParams();
  const test = params.test as string;

  // Camera permission (auto)
  const [permission, requestPermission] = useCameraPermissions();

  // Mock AI states
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [reps, setReps] = useState(0);

  // AI dot animation
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Auto request camera permission
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // Pulsing dot animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Timer + mock rep logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 1);

        // Rep-based tests
        if (test !== 'Vertical Jump' && test !== 'Shuttle Run') {
          setReps((r) => (r < 40 ? r + 1 : r));
        }
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Start test
  const startTest = () => {
    setTime(0);
    setReps(0);
    setIsRunning(true);
  };

  // Stop test and calculate score
  const stopTest = () => {
    setIsRunning(false);

    let score = 0;

    if (test === 'Vertical Jump') {
      score = Math.min(80, 40 + Math.floor(Math.random() * 20));
    } else if (test === 'Shuttle Run') {
      score = Math.max(30, 100 - time);
    } else {
      score = reps;
    }

    router.push({
      pathname: '/result',
      params: {
        ...params,
        score,
      },
    });
  };

  // If permission not ready, show blank screen
  if (!permission || !permission.granted) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  // Dot animation transform
  const dotStyle = {
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.4],
        }),
      },
      {
        translateX: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/*camera yha pr rkh diya hu abhi ke liye abhi sirf back hi rkha hu baad front kr lunga*/}
      <CameraView style={styles.camera} facing="back" />

    
      <View style={styles.overlay}>
        <Animated.View style={[styles.dot, dotStyle]} />
        <Text style={styles.trackingText}>Tracking Movement…</Text>
      </View>

    
      <View style={styles.controlArea}>
        {!isRunning ? (
          <Pressable style={styles.startBtn} onPress={startTest}>
            <Text style={styles.btnText}>Start</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.stopBtn} onPress={stopTest}>
            <Text style={styles.btnText}>Stop</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    marginBottom: 12,
  },

  trackingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },

  controlArea: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 70, 
  },

  startBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
  },

  stopBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
