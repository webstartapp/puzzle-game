import { Asset } from 'expo-asset';

export const preloadAssets = (
  assets: any[],
  onProgress: (progress: number) => void,
) => {
  let loaded = 0;
  const total = assets.length;
  return Promise.all(
    assets.map((asset) => {
      return Asset.loadAsync(asset).then(() => {
        loaded += 1;
        onProgress(loaded / total); // Update progress;
      });
    }),
  );
};
