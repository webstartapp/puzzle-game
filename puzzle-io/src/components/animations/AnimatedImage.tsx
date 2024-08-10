import { layoutStyles } from '@/styles/layoutStyles';
import { Asset } from 'expo-asset';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Animated } from 'react-native';

type AnimatedImageProps = {
  image: any;
};

export const AnimatedImage: FC<AnimatedImageProps> = ({ image }) => {
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
    <Animated.Image
      source={image}
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
  );
};

const AnimatedImageContext = createContext<{
  bgImage?: Asset;
  setBgImage: (image: Asset) => void;
}>({
  setBgImage: () => {},
});

export const useAnimatedBackground = (image: Asset) => {
  const context = useContext(AnimatedImageContext);
  if (!context) {
    throw new Error(
      'useAnimatedBackground must be used within a AnimatedImageContext',
    );
  }
  useEffect(() => {
    context.setBgImage(image);
  }, [image]);
  return context;
};

type AnimatedBackgroundProviderProps = {
  children: JSX.Element;
};

const AnimatedBackgroundProvider: FC<AnimatedBackgroundProviderProps> = ({
  children,
}) => {
  const [bgImage, setBgImage] = useState<Asset>();
  return (
    <View style={layoutStyles.container}>
      <AnimatedImageContext.Provider value={{ bgImage, setBgImage }}>
        <AnimatedImage image={bgImage} />
        {children}
      </AnimatedImageContext.Provider>
    </View>
  );
};

export default AnimatedBackgroundProvider;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '120%',
    height: '110%',
  },
});
