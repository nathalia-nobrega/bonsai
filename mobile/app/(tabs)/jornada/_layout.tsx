import { Stack } from 'expo-router';

export default function JornadaLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* outras telas da stack */}
    </Stack>
  );
}