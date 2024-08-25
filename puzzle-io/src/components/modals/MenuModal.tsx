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

type MenuModalProps = {
  shown: boolean;
  setShown: (shown: boolean) => void;
};

const MenuModal: FC<MenuModalProps> = ({ shown, setShown }) => {
  const { setRoute } = useGameRouter();
  if (!shown) return null;
  return (
    <View
      style={[
        layoutStyles.container,
        {
          position: 'absolute',
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
                setShown(false);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              onPress={() => {
                setRoute('terms');
                setShown(false);
              }}
              title="Privacy Policy"
            />
            <Button
              onPress={() => {
                setRoute('credits');
                setShown(false);
              }}
              title="Credits"
            />
            <Button
              onPress={() => {
                setShown(false);
              }}
              title="Close"
            />
          </View>
        </WoodenBackground>
      </View>
    </View>
  );
};
export default MenuModal;
