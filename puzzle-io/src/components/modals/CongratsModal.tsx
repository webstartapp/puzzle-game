import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface CongratsModalProps {
  visible: boolean;
  turns: number;
  time: number;
  stars: number;
  coins: number;
  onContinue: () => void;
}

const { width, height } = Dimensions.get('window');

const CongratsModal: React.FC<CongratsModalProps> = ({
  visible,
  turns,
  time,
  stars,
  coins,
  onContinue,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(visible);

  // Use `showConfetti` to control confetti visibility
  const handleContinue = () => {
    // Animate confetti and hide modal
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setConfettiVisible(false);
      onContinue();
    });
  };

  React.useEffect(() => {
    if (visible) {
      setShowConfetti(true);
      setConfettiVisible(true);
    } else {
      setConfettiVisible(false);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={handleContinue}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.stats}>
            Turns: {turns}
            {'\n'}
            Time: {time}s
          </Text>
          <View style={styles.stars}>
            {Array.from({ length: 3 }, (_, index) => (
              <Text
                key={index}
                style={styles.star}
              >
                {index < stars ? '⭐' : '☆'}
              </Text>
            ))}
          </View>
          <Text style={styles.coins}>Coins: {coins}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          {showConfetti && confettiVisible && (
            <ConfettiCannon
              count={200}
              origin={{ x: width / 2, y: height / 2 }}
              fadeOut={true}
              autoStart={true}
              fallSpeed={3000}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  coins: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CongratsModal;
