import { useStore } from '@/hooks/store/useStore';
import { RouterPath, useGameRouter } from '@/router/Router';
import { FC, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../basic/Button';
import home from '@/assets/images/wooden_icons/sign.png';
import key from '@/assets/images/wooden_icons/key.png';
import coin from '@/assets/images/wooden_icons/coin.png';
import settings from '@/assets/images/wooden_icons/settings.png';
import { headerStyles } from '@/styles/headerStyles';
import AssetIcon from '@/components/icons/AssetIcon';

type MapSatusBarProps = {
  backTo?: RouterPath;
};

const MapStatusBar: FC<MapSatusBarProps> = ({ backTo }) => {
  const { data } = useStore('viewer');
  const { setRoute, setShowMenu } = useGameRouter();

  const keyCount = useMemo(() => {
    const keys = data?.session?.previous
      ?.map((p) => p.stars)
      .reduce((a, b) => (a || 0) + (b || 0), 0);
    return keys || 0;
  }, [data?.session?.previous]);

  const coinCount = useMemo(() => {
    return data?.session?.coins || 0;
  }, [data?.session?.coins]);

  return (
    <View style={headerStyles.wrapper}>
      {backTo ? (
        <Button
          variant="asset"
          asset={home}
          onPress={() => {
            setRoute(backTo);
          }}
        />
      ) : (
        <View style={{ width: 30 }} />
      )}
      <AssetIcon
        asset={key}
        size={30}
        textRight={`${keyCount}/30`}
      />
      <AssetIcon
        asset={coin}
        size={30}
        textRight={`${coinCount} `}
      />
      <Button
        variant="asset"
        asset={settings}
        onPress={() => {
          setShowMenu(true);
        }}
      />
    </View>
  );
};

export default MapStatusBar;
