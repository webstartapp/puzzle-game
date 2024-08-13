import { FC, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import { buttonStyles } from '@/styles/buttonStyles';
import buttonTopLeft from '@/assets/images/wooden_icons/button-top-left.png';
import buttonTopRight from '@/assets/images/wooden_icons/button-top-right.png';
import buttonBottomLeft from '@/assets/images/wooden_icons/button-bottom-left.png';
import buttonBottomRight from '@/assets/images/wooden_icons/button-bottom-right.png';
import buttonMiddleLeft from '@/assets/images/wooden_icons/button-middle-left.png';
import buttonMiddleRight from '@/assets/images/wooden_icons/button-middle-right.png';
import buttonMiddleTop from '@/assets/images/wooden_icons/button-middle-top.png';
import buttonMiddleBottom from '@/assets/images/wooden_icons/button-middle-bottom.png';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant: 'default';
};

const Button: FC<ButtonProps> = ({ title, onPress, variant }) => {
  const styleText = buttonStyles[`${variant}Text`];
  const styleButton = styleText
    ? buttonStyles[variant] || undefined
    : undefined;
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={styleButton || buttonStyles.default}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <view
        onMouseEnter={() => setIsPressed(true)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            height: 90,
          }}
        >
          <View
            style={{
              width: 30,
              height: 90,
              opacity: isPressed ? 0.5 : 1,
            }}
          >
            <Image
              source={buttonTopLeft}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Image
              source={buttonMiddleLeft}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Image
              source={buttonBottomLeft}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <View
            style={{
              height: 90,
            }}
          >
            <View
              style={{
                width: '100%',
                height: 30,
                opacity: isPressed ? 0.5 : 1,
              }}
            >
              <ImageBackground
                source={buttonMiddleTop}
                resizeMode="repeat"
                style={{
                  width: '100%',
                  height: 30,
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styleText || buttonStyles.defaultText}>{title}</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 30,
                opacity: isPressed ? 0.5 : 1,
              }}
            >
              <ImageBackground
                source={buttonMiddleBottom}
                resizeMode="repeat"
                style={{
                  width: '100%',
                  height: 30,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: 30,
              height: 90,
              opacity: isPressed ? 0.5 : 1,
            }}
          >
            <Image
              source={buttonTopRight}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Image
              source={buttonMiddleRight}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Image
              source={buttonBottomRight}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
        </View>
      </view>
    </TouchableOpacity>
  );
};

export default Button;
