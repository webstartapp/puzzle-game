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
import WoodenBackground from './WoodenBackground';

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
      <WoodenBackground height={30}>
        <Text style={buttonStyles.woodenText}>{title}</Text>
      </WoodenBackground>
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
