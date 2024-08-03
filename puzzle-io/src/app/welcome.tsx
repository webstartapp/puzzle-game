import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeloImage from '@/assets/images/welcome_screen.jpeg';

const IntroScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [collectedKeys, setCollectedKeys] = useState(0);

  const scaleAnim = new Animated.Value(1);
  const translateXAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 11000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 13000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: -30,
          duration: 17000,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 30,
          duration: 19000,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 21000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -30,
          duration: 23000,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 30,
          duration: 33000,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 29000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim, translateXAnim, translateYAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={HeloImage} // Replace with your background image URL
        style={[
          styles.backgroundImage,
          {
            transform: [
              { scale: scaleAnim },
              { translateX: translateXAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      />
      <View style={styles.header}>
        {isLoggedIn && (
          <>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.keysContainer}>
              <Image
                source={{ uri: 'data:image/png;base64,BASE64_KEY_ICON' }} // Replace with your base64 key icon
                style={styles.keyIcon}
              />
              <Text style={styles.keysCount}>{collectedKeys}</Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle Continue Progress
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle Load Saved Game
          }}
        >
          <Text style={styles.buttonText}>Load Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle Sign In / Sign Out
            if (isLoggedIn) {
              setIsLoggedIn(false);
              setUsername('Guest');
              setCollectedKeys(0);
            } else {
              // Perform Sign In and update state accordingly
            }
          }}
        >
          <Text style={styles.buttonText}>
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    color: 'white',
  },
  keysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  keysCount: {
    fontSize: 18,
    color: 'white',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default IntroScreen;
