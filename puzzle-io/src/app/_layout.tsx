import AnimatedBackgroundProvider from '@/components/animations/AnimatedImage';
import StoreProvider from '@/components/provider/StoreProvider';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import RouterProvider from '@/router/Router';

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
