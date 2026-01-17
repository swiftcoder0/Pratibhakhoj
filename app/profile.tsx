import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
  const [height, setHeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const pickImage = async () => {
   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
       quality: 0.7,
     });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const goNext = () => {
    if (!name || !age || !gender || !height || !bloodGroup) return;

    router.push({
      pathname: '/tests',
      params: {
        name,
        age,
        gender,
        height,
        bloodGroup,
        photoUri: photoUri ?? '',
      },
    });
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.photoBox}>
        <Pressable onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-outline" size={50} color="#94a3b8" />
            </View>
          )}
          <View style={styles.plusIcon}>
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        </Pressable>
      </View>

      <Text style={styles.pageTitle}>Athlete Profile</Text>

  
      <View style={styles.card}>
  
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />


        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          value={age}
          onChangeText={setAge}
        />

    
        <Text style={styles.label}>Gender</Text>
        <View style={styles.row}>
          {['Male', 'Female'].map((g) => (
            <Pressable
              key={g}
              style={[
                styles.genderBtn,
                gender === g && styles.genderActive,
              ]}
              onPress={() => setGender(g as 'Male' | 'Female')}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === g && { color: '#fff' },
                ]}
              >
                {g}
              </Text>
            </Pressable>
          ))}
        </View>

        
        <TextInput
          placeholder="Height (cm)"
          keyboardType="numeric"
          style={styles.input}
          value={height}
          onChangeText={setHeight}
        />

        
        <TextInput
          placeholder="Blood Group (A+, O+, B- etc.)"
          style={styles.input}
          value={bloodGroup}
          onChangeText={setBloodGroup}
        />

        
        <Pressable
          style={[
            styles.continueBtn,
            (!name || !age || !gender || !height || !bloodGroup) && {
              opacity: 0.5,
            },
          ]}
          disabled={!name || !age || !gender || !height || !bloodGroup}
          onPress={goNext}
        >
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },

  photoBox: {
    alignItems: 'center',
    marginTop: 30,
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plusIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#2563eb',
    borderRadius: 14,
    padding: 4,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#0f172a',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  genderBtn: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    alignItems: 'center',
  },

  genderActive: {
    backgroundColor: '#2563eb',
  },

  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },

  continueBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
