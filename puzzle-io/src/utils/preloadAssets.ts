import { Asset } from 'expo-asset';

const assets = [
  require('@/assets/images/wooden_icons/button-top-left.png'),
  require('@/assets/images/wooden_icons/button-top-right.png'),
  require('@/assets/images/wooden_icons/button-bottom-left.png'),
  require('@/assets/images/wooden_icons/button-bottom-right.png'),
  require('@/assets/images/wooden_icons/button-middle-left.png'),
  require('@/assets/images/wooden_icons/button-middle-right.png'),
  require('@/assets/images/wooden_icons/button-middle-top.png'),
  require('@/assets/images/wooden_icons/button-middle-bottom.png'),
];

export const preloadAssets = () => {
  console.log('preloadAssets', assets);
  return Promise.all(
    assets.map((asset) => {
      return Asset.loadAsync(asset);
    }),
  );
};
