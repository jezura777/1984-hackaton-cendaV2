import { StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { View, Text, Image, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
	return (
		<View className='mx-12 my-16 pt-10'>
			<View className='mb-6 flex-row items-center justify-between'>
				<View>
					<View className='flex-row items-center gap-3 mb-3'>
						<Text className='text-4xl font-sans text-light-text dark:text-dark-text'>
							Welcome
						</Text>
						<HelloWave />
					</View>
					<Text className='text-4xl font-semibold text-light-text dark:text-dark-text'>
						Chris Allow
					</Text>
				</View>

				{/* notification component */}
				<Pressable className='w-16 h-16 bg-light-icon rounded-md shadow-lg flex items-center justify-center'>
					{/* Notification Badge */}
					<View className='absolute -top-1 -right-1 bg-light-tint w-5 h-5 rounded-full flex items-center justify-center z-10'>
						<Text className='text-xs font-bold text-white'>1</Text>
					</View>

					{/* Notification Icon */}
					<Ionicons name='notifications-outline' size={24} />
				</Pressable>
			</View>

			<View className='flex-row items-center gap-4'>
				<View className='flex-1 flex-row items-center bg-light-icon dark:bg-dark-icon rounded-md py-2 px-6 shadow-md gap-6'>
					<Ionicons name='search' size={24} />
					<TextInput placeholder='Search' className='text-gray-500 font-semibold mt-1' />
				</View>

				<Pressable className='w-16 h-16 bg-light-text rounded-md shadow-lg flex items-center justify-center'>
					<Ionicons name='funnel' size={24} color='#FFFFFF' />
				</Pressable>
			</View>
		</View>
	);
}
