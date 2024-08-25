import { GameStage } from '@/config/stages';
import { layoutStyles } from '@/styles/layoutStyles';
import { FC } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import WoodenBackground from '../basic/WoodenBackground';
import { headerStyles } from '@/styles/headerStyles';
import { buttonStyles } from '@/styles/buttonStyles';
import Button from '../basic/Button';
import cross from '@/assets/images/wooden_icons/cross.png';
import { useGameRouter } from '@/router/Router';
import { Level } from '@/utils/levelConstructor';
import { KeyGainChain } from '../header/visuals/KeyGainChain';
import home from '@/assets/images/wooden_icons/sign.png';
import { timeToMinutes } from '@/utils/timeTominutes';

type PuzzleFailModalProps = {
  levelData?: Level;
  moves: number;
  time: number;
};

const PuzzleFailModal: FC<PuzzleFailModalProps> = ({
  levelData,
  moves,
  time,
}) => {
  const { setRoute } = useGameRouter();
  if (!levelData) return null;
  return (
    <View
      style={[
        layoutStyles.container,
        {
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 100,
        },
      ]}
    >
      <View style={[layoutStyles.modalWrapper]}>
        <WoodenBackground width={350}>
          <View
            style={[
              layoutStyles.topRight,
              {
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
              <Button
                variant="asset"
                asset={cross}
                onPress={() => {
                  setRoute('WorldMapScreen');
                }}
              />
            </View>
          </View>
          <Text style={buttonStyles.woodenTitle}>
            {levelData?.title || ' '}
          </Text>
          <View>
            <Image
              source={{ uri: levelData?.image }}
              width={250}
              height={250}
              style={{ width: 250, height: 250 }}
            />
            <View
              style={{
                position: 'absolute',
                top: 80,
                left: 0,
                width: '100%',
                height: 50,
              }}
            >
              <Text style={[buttonStyles.woodenTitle]}>FAILED</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 200,
                left: 0,
                width: '100%',
                height: 50,
                backgroundColor: 'rgba(255,255,255, 0.5)',
              }}
            >
              <Text
                style={[
                  buttonStyles.woodenText,
                  {
                    lineHeight: 25,
                    padding: 0,
                  },
                ]}
              >
                Moves: {moves}
              </Text>
              <Text
                style={[
                  buttonStyles.woodenText,
                  {
                    lineHeight: 25,
                    padding: 0,
                  },
                ]}
              >
                Time: {timeToMinutes(time)}
              </Text>
            </View>
          </View>
          <Text style={buttonStyles.woodenText}>{levelData.subtitle}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              onPress={() => {
                setRoute('WorldMapScreen');
              }}
              title="Exit"
            />
            <Button
              onPress={() => {
                setRoute('puzzleScreenAnimation', {
                  level: levelData.id as any,
                });
              }}
              title="Restart"
            />
          </View>
        </WoodenBackground>
      </View>
    </View>
  );
};
export default PuzzleFailModal;
