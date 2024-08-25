import key from '@/assets/images/wooden_icons/key.png';
import AssetIcon from '@/components/icons/AssetIcon';

import { FC, useMemo } from 'react';

import { Image, View } from 'react-native';

type KeyItemProps = {
  inactive: boolean;
  rotateDeg?: number;
  size?: number;
};

type KeyChainProps = {
  activeKeys: number;
  size?: number;
};

const KeyItem: FC<KeyItemProps> = ({ inactive, rotateDeg, size = 30 }) => {
  return (
    <View>
      <AssetIcon
        asset={key}
        size={size}
        rotateDeg={rotateDeg}
        tintColor={inactive ? 'gray' : undefined}
      />
    </View>
  );
};

export const KeyGainChain: FC<KeyChainProps> = ({ activeKeys, size = 20 }) => {
  const KeyMaped = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      return (
        <KeyItem
          key={`key-${i}-${activeKeys}`}
          inactive={i >= activeKeys}
          rotateDeg={i * 15 - 105}
          size={size}
        />
      );
    });
  }, [activeKeys]);
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {KeyMaped}
    </View>
  );
};
