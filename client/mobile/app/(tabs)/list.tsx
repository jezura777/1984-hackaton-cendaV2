import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import plantsData from '@/assets/data/Plants.json';
import AnimatedProgressBar from '@/components/AnimatedProgressBar';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Plant {
	id: number;
	jmeno: string;
	image: string;
	voda: number;
	teplotaZ: number;
	teplotaV: number;
	svetlo: number;
	vlhkost: number;
	vyska: number;
	tlak: number;
}

export default function List() {
	const [selectedPlant, setSelectedPlant] = useState<null | Plant>(null);
	const [plants, setPlants] = useState(plantsData);
	const router = useRouter();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		intervalRef.current = setInterval(async () => {
			try {
				const response = await fetch('http://10.10.11.193:3000/plants');
				const data: Plant[] = await response.json();
				console.log(data);
				setPlants(data);

				if (selectedPlant) {
					const updatedSelectedPlant = data.find(
						(plant: Plant) => plant.id === selectedPlant.id
					);
					if (updatedSelectedPlant) {
						setSelectedPlant(updatedSelectedPlant);
					}
				}
			} catch (error) {
				console.error(error);
			}
		}, 300);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [selectedPlant]);

	const renderPlantItem = ({
		item,
	}: {
		item: Plant;
	}) => (
		<TouchableOpacity
			className='flex-1 m-2 bg-gray-200 items-center justify-center h-48 rounded-lg overflow-hidden'
			onPress={() => setSelectedPlant(item)}
		>
			<Image source={{ uri: item.image }} className='w-full h-full absolute top-0 left-0' />
			<View className='absolute bottom-0 w-full bg-white bg-opacity-80 p-2'>
				<Text className='text-lg font-semibold pb-1'>{item.jmeno}</Text>
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
				data={[...plantsData.plants, { id: 'add', type: 'add' } as const]}
				renderItem={({ item }) =>
					'type' in item && item.type === 'add'
						? renderAddItem()
						: renderPlantItem({ item: item as any })
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
							<Text className='text-3xl font-semibold'>{selectedPlant.jmeno}</Text>

							{/* water */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Water{' '}
									<Text className='font-semibold'>
										{Math.round((selectedPlant.voda / 14000) * 100)}%
									</Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.voda / 14000) * 100}
									color='blue'
								/>
							</View>

							{/* air moisture */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Air Moisture{' '}
									<Text className='font-semibold'>
										{Math.round(selectedPlant.vlhkost)}%
									</Text>
								</Text>
								<AnimatedProgressBar
									progress={selectedPlant.vlhkost}
									color='lightblue'
								/>
							</View>

							{/* light */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Light{' '}
									<Text className='font-semibold'>
										{Math.round((selectedPlant.svetlo / 4200) * 100)}%
									</Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.svetlo / 4200) * 100}
									color='yellow'
								/>
							</View>

							{/* air temperature */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Air Temperature:{' '}
									<Text className='font-semibold'>
										{selectedPlant.teplotaV}°C
									</Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.teplotaV / 40) * 100}
									color='red'
								/>
							</View>

							{/* soil temperature */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Soil Temperature:{' '}
									<Text className='font-semibold'>
										{selectedPlant.teplotaZ}°C
									</Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.teplotaZ / 40) * 100}
									color='green'
								/>
							</View>

							{/* pressure */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Pressure{' '}
									<Text className='font-semibold'>{selectedPlant.tlak} hPa</Text>
								</Text>
							</View>

							{/* height above sea level */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Height Above Sea Level:{' '}
									<Text className='font-semibold'>
										{Math.round(selectedPlant.vyska)}m{' '}
									</Text>
								</Text>
							</View>
						</View>
					</ScrollView>
				</Modal>
			)}
		</View>
	);
}
