import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSegments } from 'expo-router';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const segment = useSegments();

	return (
		<Tabs
			screenOptions={{
				animation: 'none',
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarShowLabel: false,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						backgroundColor: '#EBEBEB',
						position: 'absolute',
						overflow: 'hidden',
						height: 80,
						justifyContent: 'center',
						paddingTop: 15,
					},
				}),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='home-outline' color={color} style={{}} />
					),
				}}
			/>
			<Tabs.Screen
				name='scan'
				options={{
					title: 'Scan',
					headerShown: false,
					tabBarStyle: { display: 'none' },
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='scan-outline' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='list'
				options={{
					title: 'List',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='rose-outline' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='something'
				options={{
					title: 'Something',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='person-outline' color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
