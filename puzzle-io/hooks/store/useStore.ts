import { useContext } from 'react';
import { StoreContext } from '@/components/provider/StoreProvider';

export interface IStore {}

export const useStore = <T extends keyof IStore>(
  storeKey?: T,
): {
  state: IStore;
  setState: <T extends keyof IStore>(key: T, value: IStore[T]) => void;
  data: IStore[T];
} => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  const { state, dispatch } = context;

  const setState = (key: string, value: any) => {
    dispatch({ type: key, payload: value });
  };

  return {
    state: state as IStore,
    setState,
    data: state[storeKey as T],
  };
};
