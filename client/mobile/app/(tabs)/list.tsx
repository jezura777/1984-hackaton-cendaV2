import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import plantsData from '@/assets/data/RecentPlants.json';
import { ProgressBar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

export default function List() {
	const [selectedPlant, setSelectedPlant] = useState<null | {
		id: number;
		name: string;
		image: string;
		qualityOfAir: number;
		co2: number;
		airTemperature: number;
		soilMoisture: number;
		soilTemperature: number;
	}>(null);

	const router = useExpoRouter();

	const renderPlantItem = ({
		item,
	}: {
		item: {
			id: number;
			name: string;
			image: string;
			qualityOfAir: number;
			co2: number;
			airTemperature: number;
			soilMoisture: number;
			soilTemperature: number;
		};
	}) => (
		<TouchableOpacity
			className='flex-1 m-2 bg-gray-200 items-center justify-center h-48 rounded-lg overflow-hidden'
			onPress={() => setSelectedPlant(item)}
		>
			<Image source={{ uri: item.image }} className='w-full h-full absolute top-0 left-0' />
			<View className='absolute bottom-0 w-full bg-white bg-opacity-80 p-2'>
				<Text className='text-lg font-bold'>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	const renderAddItem = () => (
		<TouchableOpacity
			className='flex-1 m-2 mb-4 bg-gray-200 items-center justify-center h-48 rounded-lg overflow-hidden'
			onPress={() => router.push('/scan')}
		>
			<Ionicons name='add' size={48} color='gray' />
			<Text className='mt-2 text-lg font-bold'>Add Plant</Text>
		</TouchableOpacity>
	);

	return (
		<View className='flex-1 mb-8 mt-14'>
			<FlatList
				data={[...plantsData, { id: 'add' }]}
				renderItem={({ item }) =>
					item.id === 'add' ? renderAddItem() : renderPlantItem({ item })
				}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
				contentContainerStyle={{ paddingHorizontal: 10 }}
			/>
			{selectedPlant && (
				<Modal
					visible={true}
					animationType='slide'
					onRequestClose={() => setSelectedPlant(null)}
				>
					<ScrollView
						className='bg-light-background'
						contentContainerStyle={{ paddingBottom: 20 }}
					>
						<View className='relative items-center justify-center'>
							<Image source={{ uri: selectedPlant.image }} className='w-full h-96' />
							<TouchableOpacity
								className='absolute top-2 right-2 w-8 h-8 bg-gray-200 items-center justify-center rounded-full z-10'
								onPress={() => setSelectedPlant(null)}
							>
								<Ionicons name='close' size={24} color='#000' />
							</TouchableOpacity>
						</View>
						<View className='p-5'>
							<Text className='text-3xl font-semibold'>{selectedPlant.name}</Text>
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Quality of Air: {selectedPlant.qualityOfAir}%
								</Text>
								<ProgressBar
									progress={selectedPlant.qualityOfAir / 100}
									color='blue'
								/>
							</View>
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									CO₂ Level: {selectedPlant.co2} ppm
								</Text>
								<ProgressBar progress={selectedPlant.co2 / 500} color='green' />
							</View>
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Air Temperature: {selectedPlant.airTemperature}°C
								</Text>
								<ProgressBar
									progress={selectedPlant.airTemperature / 50}
									color='red'
								/>
							</View>
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Soil Moisture: {selectedPlant.soilMoisture}%
								</Text>
								<ProgressBar
									progress={selectedPlant.soilMoisture / 100}
									color='brown'
								/>
							</View>
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Soil Temperature: {selectedPlant.soilTemperature}°C
								</Text>
								<ProgressBar
									progress={selectedPlant.soilTemperature / 50}
									color='orange'
								/>
							</View>
						</View>
					</ScrollView>
				</Modal>
			)}
		</View>
	);
}
