import { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant: 'default';
};

const Button: FC<ButtonProps> = ({ title, onPress, variant }) => {
  const styleText = styles[`${variant}Text`];
  const styleButton = styleText ? styles[variant] || undefined : undefined;

  return (
    <TouchableOpacity
      style={styleButton || styles.default}
      onPress={onPress}
    >
      <Text style={styleText || styles.defaultText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Button;
