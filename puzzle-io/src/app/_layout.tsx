import AnimatedBackgroundProvider from '@/components/animations/AnimatedImage';
import StoreProvider from '@/components/provider/StoreProvider';
import { DefaultTheme } from '@react-navigation/native';
import { Stack, Navigator } from 'expo-router';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import IntroScreen from '.';
import RouterProvider from '@/router/Router';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
  },
};

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AnimatedBackgroundProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
        </QueryClientProvider>
      </StoreProvider>
    </AnimatedBackgroundProvider>
  );
}
