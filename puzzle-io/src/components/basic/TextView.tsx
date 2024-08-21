import { headerStyles } from '@/styles/headerStyles';
import { timeToMinutes } from '@/utils/timeTominutes';
import { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

type TextViewProps = {
  text: string | number | undefined;
  format?: 'text' | 'time';
  children?: JSX.Element;
};

export const HederTextView: FC<TextViewProps> = ({
  text,
  format,
  children,
}) => {
  const formatedText = format === 'time' ? timeToMinutes(text) : text;
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={headerStyles.whiteText}>{formatedText}</Text>
      {children}
    </View>
  );
};
