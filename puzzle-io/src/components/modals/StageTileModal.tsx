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

type StageTileModalProps = {
  stageData?: GameStage;
  setStageData: (stageData?: GameStage) => void;
};

const StageTileModal: FC<StageTileModalProps> = ({
  stageData,
  setStageData,
}) => {
  const { setRoute } = useGameRouter();
  if (!stageData) return null;
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
          <View style={layoutStyles.topRight}>
            <Button
              variant="asset"
              asset={cross}
              onPress={() => {
                setStageData();
              }}
            />
          </View>
          <Text style={buttonStyles.woodenTitle}>{stageData?.title}</Text>
          <Image
            source={stageData?.image}
            width={250}
            height={250}
            style={{ width: 250, height: 250 }}
          />
          <Text style={buttonStyles.woodenText}>{stageData.objective}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              onPress={() => {
                setStageData();
              }}
              title="Close"
            />
            <Button
              onPress={() => {
                setRoute('StageMapScreen', { stage: stageData.id });
              }}
              title="Enter"
            />
          </View>
        </WoodenBackground>
      </View>
    </View>
  );
};
export default StageTileModal;
