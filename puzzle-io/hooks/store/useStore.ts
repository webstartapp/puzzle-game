import { useContext } from 'react';
import { StoreContext } from '@/components/provider/StoreProvider';

export interface IStore {
  initiated: boolean;
}

type UseStore<T extends keyof IStore> = {
  state: IStore;
  setState: <T extends keyof IStore>(
    key: T,
    value: IStore[T] | ((previous: Required<IStore>[T]) => IStore[T]),
  ) => void;
  data: IStore[T];
};

export const useStore = <T extends keyof IStore>(storeKey?: T): UseStore<T> => {
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
