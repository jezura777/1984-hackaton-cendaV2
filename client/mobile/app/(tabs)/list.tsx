import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import plantsData from '@/assets/data/Plants.json';
import AnimatedProgressBar from '@/components/AnimatedProgressBar';

export default function List() {
	const [selectedPlant, setSelectedPlant] = useState<null | {
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
	}>(null);
	const router = useRouter();

	const getColor = (property: string, value: number): string => {
		switch (property) {
			case 'teplotaV': // air temperature
				if (value < 18 || value > 27) return 'red';
				if ((value >= 18 && value < 20) || (value > 25 && value <= 27)) return 'yellow';
				return 'green';
			case 'tlak': // pressure
				if (value < 900 || value > 1100) return 'red';
				if ((value >= 900 && value < 950) || (value > 1050 && value <= 1100))
					return 'yellow';
				return 'green';
			case 'vyska': // height above sea level
				if (value < 50 || value > 200) return 'red';
				if ((value >= 50 && value < 100) || (value > 150 && value <= 200)) return 'yellow';
				return 'green';
			case 'vlhkost': // air moisture
				if (value < 20 || value > 80) return 'red';
				if ((value >= 20 && value < 30) || (value > 70 && value <= 80)) return 'yellow';
				return 'green';
			case 'svetlo': // light
				if (value < 2 || value > 6) return 'red';
				if ((value >= 2 && value < 3) || (value > 5 && value <= 6)) return 'yellow';
				return 'green';
			case 'teplotaZ': // soil temperature
				if (value < 15 || value > 30) return 'red';
				if ((value >= 15 && value < 18) || (value > 27 && value <= 30)) return 'yellow';
				return 'green';
			case 'voda': // water in soil
				if (value < 20 || value > 80) return 'red';
				if ((value >= 20 && value < 30) || (value > 70 && value <= 80)) return 'yellow';
				return 'green';
			default:
				return 'gray';
		}
	};

	const renderPlantItem = ({
		item,
	}: {
		item: {
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
		};
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
							<Text className='text-3xl font-semibold'>{selectedPlant.jmeno}</Text>

							{/* pressure */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Pressure{' '}
									<Text className='font-semibold'>{selectedPlant.tlak} Pa</Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.tlak / 1100) * 100}
									color={getColor('tlak', selectedPlant.tlak)}
								/>
							</View>

							{/* height above sea level */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Height Above Sea Level:{' '}
									<Text className='font-semibold'> {selectedPlant.vyska}m </Text>
								</Text>
								<AnimatedProgressBar
									progress={(selectedPlant.vyska / 200) * 100}
									color={getColor('vyska', selectedPlant.vyska)}
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
									color={getColor('teplotaV', selectedPlant.teplotaV)}
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
									color={getColor('teplotaZ', selectedPlant.teplotaZ)}
								/>
							</View>

							{/* soil water */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Soil Water:{' '}
									<Text className='font-semibold'>{selectedPlant.voda}%</Text>
								</Text>
								<AnimatedProgressBar
									progress={selectedPlant.voda}
									color={getColor('voda', selectedPlant.voda)}
								/>
							</View>

							{/* air moisture */}
							<View className='my-4 p-4 bg-white rounded-md shadow-md'>
								<Text className='font-sans text-lg'>
									Air Moisture:{' '}
									<Text className='font-semibold'>{selectedPlant.vlhkost}%</Text>
								</Text>
								<AnimatedProgressBar
									progress={selectedPlant.vlhkost}
									color={getColor('vlhkost', selectedPlant.vlhkost)}
								/>
							</View>
						</View>
					</ScrollView>
				</Modal>
			)}
		</View>
	);
}
