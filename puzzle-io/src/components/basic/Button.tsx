import { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from '@/styles/buttonStyles';

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

  return (
    <TouchableOpacity
      style={styleButton || buttonStyles.default}
      onPress={onPress}
    >
      <Text style={styleText || buttonStyles.defaultText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
