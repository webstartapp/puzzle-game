import { GameStage } from '@/config/stages';
import { layoutStyles } from '@/styles/layoutStyles';
import { FC, useMemo } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import WoodenBackground from '../basic/WoodenBackground';
import { buttonStyles } from '@/styles/buttonStyles';
import Button from '../basic/Button';
import cross from '@/assets/images/wooden_icons/cross.png';
import { useGameRouter } from '@/router/Router';
import { Level } from '@/utils/levelConstructor';
import { KeyGainChain } from '../header/visuals/KeyGainChain';
import { useStore } from '@/hooks/store/useStore';
import { timeToMinutes } from '@/utils/timeTominutes';

type LevelTileModalProps = {
  levelData?: Level;
  setLevelData: (levelData?: GameStage) => void;
};

const LevelTileModal: FC<LevelTileModalProps> = ({
  levelData,
  setLevelData,
}) => {
  const { setRoute } = useGameRouter();
  const { state } = useStore();
  const progressSession = useMemo(() => {
    const previous = (state.viewer?.session?.previous || []).find(
      (p) => p.levelId === levelData?.id,
    );
    return previous;
  }, [state.viewer?.session?.previous, levelData?.id]);
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
        <WoodenBackground width={300}>
          <View
            style={[
              layoutStyles.topRight,
              {
                width: '100%',
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <KeyGainChain
                activeKeys={progressSession?.stars || 0}
                size={30}
              />
              <Button
                variant="asset"
                asset={cross}
                onPress={() => {
                  setLevelData();
                }}
              />
            </View>
          </View>
          <Text style={buttonStyles.woodenTitle}>{levelData?.title}</Text>
          <View>
            <Image
              source={{ uri: levelData?.image }}
              width={250}
              height={250}
              style={{ width: 250, height: 250 }}
            />
            {progressSession?.levelId ? (
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
                  Best moves: {progressSession.moves}
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
                  Best Time: {timeToMinutes(progressSession.time)}
                </Text>
              </View>
            ) : null}
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
                setLevelData();
              }}
              title="Close"
            />
            <Button
              onPress={() => {
                setRoute('puzzleScreenAnimation', {
                  level: levelData.id as any,
                });
              }}
              title="Enter"
            />
          </View>
        </WoodenBackground>
      </View>
    </View>
  );
};
export default LevelTileModal;
