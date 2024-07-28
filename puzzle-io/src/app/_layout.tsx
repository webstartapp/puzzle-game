import StoreProvider from '@/components/provider/StoreProvider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StoreProvider>
  );
}
