import { FC, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { buttonStyles } from '@/styles/buttonStyles';
import buttonTopLeft from '@/assets/images/wooden_icons/button-top-left.png';
import buttonTopRight from '@/assets/images/wooden_icons/button-top-right.png';
import buttonBottomLeft from '@/assets/images/wooden_icons/button-bottom-left.png';
import buttonBottomRight from '@/assets/images/wooden_icons/button-bottom-right.png';
import buttonMiddleLeft from '@/assets/images/wooden_icons/button-middle-left.png';
import buttonMiddleRight from '@/assets/images/wooden_icons/button-middle-right.png';
import buttonTopMiddle from '@/assets/images/wooden_icons/button-top-middle.png';
import buttonMiddleBottom from '@/assets/images/wooden_icons/button-middle-bottom.png';
import buttonMiddleMiddle from '@/assets/images/wooden_icons/button-middle-middle.png';

type ButtonProps = {
  asset?: ImageSourcePropType;
  title?: string;
  onPress: () => void;
  variant?: 'wooden' | 'asset';
};

const WoodenButton: FC<ButtonProps> = ({ title, onPress, variant }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={buttonStyles.wooden}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View>
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
                source={buttonTopMiddle}
                resizeMode="repeat"
                imageStyle={{
                  height: 30,
                  width: '100%',
                  resizeMode: 'stretch',
                }}
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
              <ImageBackground
                source={buttonMiddleMiddle}
                resizeMode="repeat"
                imageStyle={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'stretch',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
              />
              <Text style={buttonStyles.woodenText}>{title}</Text>
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
                height={30}
                imageStyle={{
                  height: 30,
                  width: '100%',
                  resizeMode: 'stretch',
                }}
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
      </View>
    </TouchableOpacity>
  );
};

const AssetButton: FC<ButtonProps> = ({ asset, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={asset}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const Button: FC<ButtonProps> = (props) => {
  if (!props.variant || props.variant === 'wooden') {
    return <WoodenButton {...props} />;
  }
  return <AssetButton {...props} />;
};

export default Button;
