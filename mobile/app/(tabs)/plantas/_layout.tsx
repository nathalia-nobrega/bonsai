import { Stack } from 'expo-router';

export default function PlantasLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="plant" options={{ headerShown: false }} />
      {/* outras telas da stack */}
    </Stack>
  );
}