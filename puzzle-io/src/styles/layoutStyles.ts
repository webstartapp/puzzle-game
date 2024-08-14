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
  fullScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  centeredContiner: {
    position: 'absolute',
    bottom: 100,
  },
  loadingText: {
    fontSize: 40,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  spinner: {
    marginTop: 20,
  },
});
