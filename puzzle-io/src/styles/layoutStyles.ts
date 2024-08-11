import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  centeredContiner: {
    position: 'absolute',
    bottom: 100,
  },
});
