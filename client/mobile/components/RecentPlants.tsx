import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import mockData from '../assets/data/RecentPlants.json';

const MostPopularPlants = () => {
	const renderPlantCard = ({
		item,
		index,
	}: {
		item: { id: number; name: string; water: number; image: string };
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
					<Text className='text-md text-light-text font-semibold'>{item.name}</Text>
					<View className='mt-2'>
						<Ionicons name='water' size={20} color='blue' className='-mb-3' />
						<View className='ml-6 mb-3'>
							<View className='ml-2 w-40 h-2 bg-blue-200 rounded'>
								<View
									className='h-2 bg-blue-500 rounded-md pl-2'
									style={{
										width: `${Math.min((item.water / 12000) * 100, 100)}%`, // Ensure it's within 0-100%
									}}
								/>
							</View>
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
				<TouchableOpacity>
					<Text className='text-md text-gray-500 font-sans'>Show All</Text>
				</TouchableOpacity>
			</View>
			{/* Sliding Cards */}
			<FlatList
				data={mockData}
				horizontal
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderPlantCard}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: 8 }}
			/>
		</View>
	);
};

export default MostPopularPlants;
