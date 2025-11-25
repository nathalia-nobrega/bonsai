// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { usePathname } from "expo-router";
import { router } from "expo-router";


import PerfilIconGray from '../../assets/images/perfil-icon-gray.svg';
import PerfilIconGreen from '../../assets/images/perfil-icon-green.svg';
import HomeIconGray from '../../assets/images/home-icon-gray.svg';
import HomeIconGreen from '../../assets/images/home-icon-green.svg';
import JornadaIconGray from '../../assets/images/jornada-icon-gray.svg';
import JornadaIconGreen from '../../assets/images/jornada-icon-green.svg';
import PlantaIconGray from '../../assets/images/planta-icon-gray.svg';
import PlantaIconGreen from '../../assets/images/planta-icon-green.svg';

const ICON_SIZE = 45;

export default function TabLayout() {
  const pathname = usePathname();

  // está na tela jornada?
  const onJornada = pathname === "/jornada";
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {    
          position: 'absolute',
          left: 20,
          right: 20,
          height: 100,
          paddingTop: 25,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          zIndex: 10,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={70}
            tint= {onJornada ? "dark" : "light"}
            style={{
              flex: 1,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="jornada"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/jornada");
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <JornadaIconGreen width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <JornadaIconGray width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </View>
          ),
        }}
      />


      <Tabs.Screen
        name="home"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/home");
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <HomeIconGreen width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <HomeIconGray width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </View>
          ),
        }}
      />


      <Tabs.Screen
        name="plantas"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/plantas");
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <PlantaIconGreen width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <PlantaIconGray width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </View>
          ),
        }}
      />


      <Tabs.Screen
        name="perfil"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/perfil");
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <PerfilIconGreen width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <PerfilIconGray width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </View>
          ),
        }}
      />

    </Tabs>
  );
}
