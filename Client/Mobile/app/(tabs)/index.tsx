import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text } from 'react-native';
import Header from '@/components/Header';
import RecentPlants from '@/components/RecentPlants';
import NotificationsModal from '@/components/NotificationsModal';
import NotificationsButton from '@/components/NotificationsButton';

export default function HomeScreen() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleOpenModal = () => {
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	return (
		<View className='flex-1'>
			<Header
				isModalVisible={isModalVisible}
				onNotificationClick={handleOpenModal}
				onModalClose={handleCloseModal}
			/>
			<RecentPlants />
			<NotificationsModal isVisible={isModalVisible} onClose={handleCloseModal} />
		</View>
	);
}
