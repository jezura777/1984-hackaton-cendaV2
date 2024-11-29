import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
	useFonts,
	Poppins_600SemiBold,
	Poppins_700Bold,
	Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Poppins_400Regular: require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
		Poppins_500Medium: require('@expo-google-fonts/poppins/Poppins_500Medium.ttf'),
		Poppins_600SemiBold: require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
		Poppins_700Bold: require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}