import React, { PropsWithChildren, useRef } from 'react';
import { Modal, View, Text, Pressable, PanResponder, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import notifications from '../assets/data/Notifications.json';

type Props = PropsWithChildren<{
	isVisible: boolean;
	onClose: () => void;
}>;

const emojiMap: { [key: string]: string } = {
	'Watering Alert: Heartleaf Philodendron': '💧',
	'Temperature Warning: Tropical Plant': '🌡️',
	'Watering Reminder: Indoor Plant': '🚿',
	'Sunlight Alert: Decor Plant': '🌤️',
	'Fertilizer Needed: Flower Plant': '🌱',
};

export default function NotificationsModal({ isVisible, children, onClose }: Props) {
	return (
		<Modal animationType='slide' transparent={true} visible={isVisible}>
			<View className='flex-1 justify-end'>
				<View className='h-1/2 w-full bg-light-background rounded-lg p-8'>
					<View className='flex-row align-center justify-between mb-8'>
						<Text className='text-light-text text-2xl font-semibold'>
							Notifications
						</Text>
						<Pressable onPress={onClose}>
							<Ionicons name='close' color='#000' size={22} />
						</Pressable>
					</View>
					<ScrollView>
						{notifications.slice(0, 3).map((item) => (
							<View
								key={item.id}
								className='flex-row mb-6 p-4 bg-white rounded-lg shadow'
							>
								<Text className='text-2xl mr-4'>{emojiMap[item.title]}</Text>
								<View>
									<Text
										className='text-md font-semibold'
										style={{ flexWrap: 'wrap', width: '80%' }}
									>
										{item.title}
									</Text>
									<Text
										className='text-sm font-sans'
										style={{ flexWrap: 'wrap', width: '50%' }}
									>
										{item.description}
									</Text>
								</View>
							</View>
						))}
					</ScrollView>
					{children}
				</View>
			</View>
		</Modal>
	);
}
