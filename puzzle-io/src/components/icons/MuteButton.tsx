import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';

export const MutedIconVector = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M12 3L7 8H3V16H7L12 21V3Z"
      fill="currentColor"
    />
    <Path
      d="M16.5 8.5L20.5 12.5M20.5 8.5L16.5 12.5"
      stroke="currentColor"
      strokeWidth="2"
      stroke-line-cap="round"
      stroke-line-join="round"
    />
  </Svg>
);

export const UnmutedIconVector = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M12 3L7 8H3V16H7L12 21V3Z"
      fill="currentColor"
    />
    <Path
      d="M16 10V14"
      stroke="currentColor"
      strokeWidth="2"
      stroke-line-cap="round"
      stroke-line-join="round"
    />
    <Path
      d="M18.5 8.5V15.5"
      stroke="currentColor"
      strokeWidth="2"
      stroke-line-cap="round"
      stroke-line-join="round"
    />
    <Path
      d="M21 7V17"
      stroke="currentColor"
      strokeWidth="2"
      stroke-line-cap="round"
      stroke-line-join="round"
    />
  </Svg>
);

type MuteButtonProps = {
  isMuted: boolean;
  onToggleMute: () => void;
};

export const MuteButton: FC<MuteButtonProps> = ({ isMuted, onToggleMute }) => (
  <TouchableOpacity
    onPress={onToggleMute}
    style={styles.button}
  >
    {isMuted ? <MutedIconVector /> : <UnmutedIconVector />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
