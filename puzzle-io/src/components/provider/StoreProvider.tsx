import React, {
  createContext,
  useReducer,
  useEffect,
  FC,
  PropsWithChildren,
  useState,
  Dispatch,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStore } from '@/hooks/store/useStore';
import * as SplashScreen from 'expo-splash-screen';
import uuid from 'react-native-uuid';
import { Animated, Text, View } from 'react-native';
import { useSound } from '../basic/Sound';
import introImage from '@/config/preload/introImage.json';
import { useAnimatedBackground } from '../animations/AnimatedImage';
import introScreen from '@/assets/music/intro_screen_bg.mp3';
import { layoutStyles } from '@/styles/layoutStyles';
import { preloadAssets } from '@/utils/preloadAssets';
import { secondaryAssets } from '@/config/preload/secondaryAssets';
SplashScreen.preventAutoHideAsync();

const initialState: IStore = {
  initiated: false,
} as IStore;

export const StoreContext = createContext<{
  state: IStore;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

type Action<T extends keyof IStore | 'INIT'> = {
  type: T;
  payload: T extends keyof IStore ? IStore[T] : IStore;
};

const reducer = <T extends keyof IStore | 'INIT'>(
  state: IStore,
  action: Action<T>,
): IStore => {
  const payload: any = action.payload;
  if (action.type === 'INIT') {
    if (typeof payload === 'function') {
      return payload(state) as IStore;
    }
    return action.payload as IStore;
  }
  if (typeof payload === 'function') {
    return { ...state, [action.type]: payload((state as any)[action.type]) };
  }
  globalState = { ...state, [action.type]: action.payload };
  return globalState;
};

let globalState: IStore = initialState;
let globalDispatch: React.Dispatch<Action<keyof IStore | 'INIT'>> = () => null;

const PERSISTED_STATE_KEY = 'my-app-store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useSound(introScreen, true);
  const [progress] = useState(new Animated.Value(0));
  useAnimatedBackground(introImage);

  useEffect(() => {
    if (!state.initiated) {
      return;
    }
    globalState = state;
    globalDispatch = dispatch;
  }, [state]);

  useEffect(() => {
    const loadState = async () => {
      let localState = globalState;
      try {
        await preloadAssets(secondaryAssets, (p) => {
          Animated.timing(progress, {
            toValue: p,
            duration: 500,
            useNativeDriver: false,
          }).start();
        });
      } catch (e) {
        console.error(e);
      }
      await SplashScreen.hideAsync();
      if (localState.initiated) {
        return;
      }
      const savedState = await AsyncStorage.getItem(PERSISTED_STATE_KEY);
      try {
        localState = {
          ...globalState,
          ...JSON.parse(savedState || '{}'),
        };
      } catch (e) {
        console.error('Error loading state from storage', e);
      }
      if (!localState.initiated) {
        localState.initiated = true;
        if (!globalState.viewer) {
          localState.viewer = {
            session: {
              coins: 0,
              previous: [],
            },
            email: '',
            id: uuid.v4() as string,
          };
        }
      }
      dispatch({
        type: 'INIT' as keyof IStore,
        payload: localState,
      });
    };

    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state));
    };

    saveState();
  }, [state]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!state.initiated) {
    return (
      <View style={layoutStyles.container}>
        <Text style={layoutStyles.loadingText}>Loading...</Text>
        <View style={layoutStyles.progressBarContainer}>
          <Animated.View
            style={[layoutStyles.progressBar, { width: progressBarWidth }]}
          />
        </View>
      </View>
    );
  }

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

export const getStoreData = () => globalState;

const dispatchStore = () => globalDispatch;

export const dispatchStoreData = <T extends keyof IStore | 'INIT'>(
  storekey: T,
  payload: T extends keyof IStore ? IStore[T] : IStore,
) => {
  const dispatch = dispatchStore();
  dispatch({ type: storekey, payload });
};
