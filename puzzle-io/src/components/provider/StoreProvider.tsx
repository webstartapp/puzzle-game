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

const initialState: IStore = {};

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
  if (action.type === 'INIT') {
    return action.payload as IStore;
  }
  return { ...state, [action.type]: action.payload };
};

let globalState: IStore = initialState;
let globalDispatch: React.Dispatch<Action<keyof IStore | 'INIT'>> = () => null;

const PERSISTED_STATE_KEY = 'my-app-store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    globalState = state;
    globalDispatch = dispatch;
  }, [state]);

  useEffect(() => {
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem(PERSISTED_STATE_KEY);
      setIsLoading(false);
      if (savedState) {
        dispatch({
          type: 'INIT' as keyof IStore,
          payload: JSON.parse(savedState),
        });
      }
    };

    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state));
    };

    saveState();
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {isLoading ? <></> : children}
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
