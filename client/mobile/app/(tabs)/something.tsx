import React, { useState } from 'react';
import { Image, Platform, TextInput, TouchableOpacity, Alert, View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Something() {
	const { imageUri } = useLocalSearchParams();
	const [name, setName] = useState('');
	const router = useRouter();

	const savePlant = async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			Alert.alert('Success', 'Plant saved successfully');
			router.push('/list');
		} catch (error) {
			Alert.alert('Error', 'Something went wrong');
		}
	};

	const image = typeof imageUri === 'string' ? { uri: imageUri } : null;

	return (
		<View className='flex-1 p-4 items-center'>
			{image && <Image source={image} className='w-full h-2/3' />}

			<TextInput
				placeholder='Enter plant name'
				value={name}
				onChangeText={setName}
				className='mt-4 border-b border-gray-400 w-full text-2xl font-sans'
				placeholderTextColor='gray'
			/>
			<Text className='mt-9 text-gray-600 font-sans text-lg'>
				Bluetooth Device: 00:1A:7D:DA:71:13
			</Text>
			<TouchableOpacity
				onPress={savePlant}
				className='mt-9 bg-light-tint py-3 px-6 rounded-md'
			>
				<Text className='text-white text-lg font-sans'>Save</Text>
			</TouchableOpacity>
		</View>
	);
}
