import StoreProvider from '@/components/provider/StoreProvider';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </StoreProvider>
  );
}
