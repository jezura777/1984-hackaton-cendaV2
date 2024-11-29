import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import mockData from '../assets/data/Plants.json';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import AnimatedProgressBar from '../components/AnimatedProgressBar';

export default function MostPopularPlants() {
	const { navigate } = useExpoRouter();

	const renderPlantCard = ({
		item,
		index,
	}: {
		item: { id: number; jmeno: string; voda: number; image: string };
		index: number;
	}) => {
		const backgroundClass = index % 2 === 0 ? 'bg-light-tint' : 'bg-[#ABABAB]';
		return (
			<View
				className={`w-72 h-96 ${backgroundClass} rounded-lg mr-4 overflow-hidden relative`}
			>
				<Image
					source={{ uri: item.image }}
					className='w-full h-full absolute top-0 left-0'
				/>
				<View className='absolute w-11/12 m-3 px-2 pt-7 pb-3 pl-5 bottom-0 rounded-2xl bg-white'>
					<Text className='text-md text-light-text font-semibold'>{item.jmeno}</Text>
					<View className='mt-3'>
						<Ionicons name='water' size={20} color='blue' className='-mb-6' />
						<View className='ml-8 mb-3'>
							<AnimatedProgressBar
								progress={(item.voda / 14000) * 100}
								color='blue'
							/>
						</View>
					</View>
				</View>
				<TouchableOpacity className='absolute top-4 right-4 bg-white p-1 rounded-md shadow'>
					<Ionicons name='heart' size={20} color='green' className='p-1' />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View className='mx-12 p-4'>
			{/* Header */}
			<View className='flex-row justify-between items-center mb-4'>
				<View className='flex-row justify-between gap-3 items-center'>
					<Ionicons name='leaf' size={24} color='green' />
					<Text className='text-lg font-semibold'>Recent</Text>
				</View>
				<TouchableOpacity onPress={() => navigate('/list')}>
					<Text className='text-md text-gray-500 font-sans'>Show All</Text>
				</TouchableOpacity>
			</View>
			{/* Sliding Cards */}
			<FlatList
				data={mockData.plants}
				horizontal
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderPlantCard}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: 8 }}
			/>
		</View>
	);
}
