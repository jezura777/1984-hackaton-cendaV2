import React, { useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
	onPress: () => void;
};

export default function NotificationsButton({ onPress }: Props) {
	const scale = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scale, {
			toValue: 0.9,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scale, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Animated.View style={{ transform: [{ scale }] }}>
			<Pressable
				onPress={onPress} // Trigger modal opening instantly
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				className='w-16 h-16 bg-light-icon rounded-md shadow-lg flex items-center justify-center'
			>
				{/* Notification Badge */}
				<View className='absolute -top-1 -right-1 bg-light-tint w-5 h-5 rounded-full flex items-center justify-center z-10'>
					<Text className='text-xs font-bold text-white'>5</Text>
				</View>

				{/* Notification Icon */}
				<Ionicons name='notifications-outline' size={24} />
			</Pressable>
		</Animated.View>
	);
}
