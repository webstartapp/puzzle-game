import AnimatedBackgroundProvider from '@/components/animations/AnimatedImage';
import StoreProvider from '@/components/provider/StoreProvider';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import RouterProvider from '@/router/Router';
import HeloImage from '@/assets/images/welcome_screen.jpeg';
import introScreen from '@/assets/music/intro_screen_bg.mp3';
import introImage from '@/config/preload/introImage.json';
import { ImageBackground, View } from 'react-native';
import { layoutStyles } from '@/styles/layoutStyles';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <View style={layoutStyles.fullScreen}>
      <ImageBackground
        source={introImage}
        style={layoutStyles.fullScreen}
      />
      <View style={layoutStyles.fullScreen}>
        <AnimatedBackgroundProvider>
          <QueryClientProvider client={queryClient}>
            <StoreProvider>
              <RouterProvider />
            </StoreProvider>
          </QueryClientProvider>
        </AnimatedBackgroundProvider>
      </View>
    </View>
  );
}
