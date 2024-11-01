import { headerStyles } from '@/styles/headerStyles';
import { TintColors, tintColors } from '@/styles/tintColors';
import { loadImage } from '@/utils/initiateGameLevel';
import { Asset } from 'expo-asset';
import { FC, useEffect, useMemo, useState } from 'react';
import { Image, ImageSourcePropType, Platform, Text, View } from 'react-native';

type AssetIconProps = {
  asset: ImageSourcePropType;
  size: number;
  rotateDeg?: number;
  tintColor?: TintColors;
  textRight?: string;
};

const AssetIcon: FC<AssetIconProps> = ({
  asset,
  size,
  rotateDeg,
  tintColor,
  textRight,
}) => {
  const [localAssest, setLocalAsset] = useState<string>();

  const tint = useMemo(() => {
    if (tintColors[tintColor as TintColors]) {
      return tintColors[tintColor as TintColors];
    }
    return undefined;
  }, [tintColor]);
  useEffect(() => {
    const loader = async () => {
      const assetData = await Asset.loadAsync(asset as any);
      setLocalAsset(assetData[0].uri);
    };
    loader();
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        {tint ? (
          <Image
            source={{
              uri: localAssest,
              width: size,
              height: size,
            }}
            style={[
              {
                transform: [{ rotate: `${rotateDeg || 0}deg` }],
                position: 'absolute',
              },
              { tintColor: tint.color },
            ]}
          />
        ) : null}
        <Image
          source={{
            uri: localAssest,
            width: size,
            height: size,
          }}
          style={[
            {
              transform: [{ rotate: `${rotateDeg || 0}deg` }],
              zIndex: 2,
              opacity: tint?.alpha,
            },
          ]}
        />
      </View>
      {textRight ? (
        <Text style={headerStyles.whiteText}>{textRight}</Text>
      ) : null}
    </View>
  );
};

export default AssetIcon;
