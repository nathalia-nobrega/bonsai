// app/(tabs)/plantas/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function PlantasLayout() {
  return (
    // unmountOnBlur faz com que a stack seja desmontada quando a aba perde foco
    <Stack
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="plant" />
      <Stack.Screen name="addPlant" />
    </Stack>
  );
}
