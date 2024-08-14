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
import { preloadAssets } from '@/utils/preloadAssets';
import * as SplashScreen from 'expo-splash-screen';
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
import uuid from 'react-native-uuid';
import { Text } from 'react-native';

const PERSISTED_STATE_KEY = 'my-app-store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        await preloadAssets();
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

  if (!state.initiated) {
    return <Text>waiting</Text>;
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
