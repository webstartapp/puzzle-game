import { FC } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import buttonTopLeft from '@/assets/images/wooden_icons/button-top-left.png';
import buttonTopRight from '@/assets/images/wooden_icons/button-top-right.png';
import buttonBottomLeft from '@/assets/images/wooden_icons/button-bottom-left.png';
import buttonBottomRight from '@/assets/images/wooden_icons/button-bottom-right.png';
import buttonMiddleLeft from '@/assets/images/wooden_icons/button-middle-left.png';
import buttonMiddleRight from '@/assets/images/wooden_icons/button-middle-right.png';
import buttonTopMiddle from '@/assets/images/wooden_icons/button-top-middle.png';
import buttonMiddleBottom from '@/assets/images/wooden_icons/button-middle-bottom.png';
import buttonMiddleMiddle from '@/assets/images/wooden_icons/button-middle-middle.png';

type WoodenBackgroundProps = {
  children: React.ReactNode;
  height?: number;
  width?: number;
};

const WoodenBackground: FC<WoodenBackgroundProps> = ({
  children,
  height,
  width,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          height: height ? height + 60 : '100%',
        }}
      >
        <View
          style={{
            width: 30,
            height: height ? height + 60 : 'auto',
            flexDirection: 'column',
          }}
        >
          <Image
            source={buttonTopLeft}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <ImageBackground
            source={buttonMiddleLeft}
            resizeMode="repeat"
            imageStyle={{
              width: 30,
              height: height ? height : '100%',
              resizeMode: 'stretch',
            }}
            style={{
              width: 30,
              height: height ? height : '100%',
            }}
          />
          <Image
            source={buttonBottomLeft}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
        <View
          style={{
            height: height ? height + 60 : 'auto',
          }}
        >
          <View
            style={{
              width: width ? width : '100%',
              height: 30,
            }}
          >
            <ImageBackground
              source={buttonTopMiddle}
              resizeMode="repeat"
              imageStyle={{
                height: 30,
                width: width ? width : '100%',
                resizeMode: 'stretch',
              }}
              style={{
                width: '100%',
                height: 30,
              }}
            />
          </View>
          <View
            style={{
              width: width ? width : '100%',
              height: height ? height : '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={buttonMiddleMiddle}
              resizeMode="repeat"
              imageStyle={{
                height: '100%',
                width: '100%',
                resizeMode: 'stretch',
              }}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            {children}
          </View>
          <View
            style={{
              width: width ? width : '100%',
              height: 30,
            }}
          >
            <ImageBackground
              source={buttonMiddleBottom}
              resizeMode="repeat"
              height={30}
              imageStyle={{
                height: 30,
                width: '100%',
                resizeMode: 'stretch',
              }}
              style={{
                width: '100%',
                height: 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 30,
            height: height ? height + 60 : 'auto',
            flexDirection: 'column',
          }}
        >
          <Image
            source={buttonTopRight}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <ImageBackground
            source={buttonMiddleRight}
            resizeMode="repeat"
            imageStyle={{
              width: 30,
              height: height ? height : '100%',
              resizeMode: 'stretch',
            }}
            style={{
              width: 30,
              height: height ? height : '100%',
            }}
          />
          <Image
            source={buttonBottomRight}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default WoodenBackground;
