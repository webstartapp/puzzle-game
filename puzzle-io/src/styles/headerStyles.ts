import { StyleSheet } from 'react-native';
export const headerStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 90,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  whiteText: {
    color: 'white',
    fontSize: 40,
    lineHeight: 40,
    marginHorizontal: 10,
  },
});
