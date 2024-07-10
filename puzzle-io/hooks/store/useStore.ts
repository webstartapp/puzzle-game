import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
interface IStore {}

type UseStore<
  T extends keyof IStore,
  U extends IStore[T] | undefined = undefined,
> = {
  loading: boolean;
  data: U | undefined;
  setData: (newValue: U) => Promise<U>;
};

export const getStoreValue = async <
  T extends keyof IStore,
  U extends IStore[T] | undefined = undefined,
>(
  key: T,
  fallbackValue?: U,
): Promise<U> => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(fallbackValue));
    return fallbackValue as U;
  }
};

export const setStoreValue = async <
  T extends keyof IStore,
  U extends IStore[T] | undefined = undefined,
>(
  key: T,
  newValue: U,
): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(newValue));
  return newValue;
};

export const useStore = <
  T extends keyof IStore = keyof IStore,
  U extends IStore[T] | undefined = undefined,
>(
  key: T,
  fallbackValue?: U,
): UseStore<T, U> => {
  const [localValue, setLocalValue] = useState<U>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        setLocalValue(JSON.parse(data));
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(fallbackValue));
        setLocalValue(fallbackValue);
      }
      setLoading(false);
    })();
  }, [fallbackValue, key]);

  const setValue = useCallback(
    async (newValue: U) => {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
      return newValue;
    },
    [key],
  );

  return { data: localValue, loading, setData: setValue };
};
