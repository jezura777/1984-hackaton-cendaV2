import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function Scan() {
	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef(null);
	const router = useRouter();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted)
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title='Grant permission' />
			</View>
		);

	function toggleCameraFacing() {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	}

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			console.log(photo.uri);
			router.push({
				pathname: '/something',
				params: { imageUri: photo.uri },
			});
		}
	};

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} facing={facing} ref={cameraRef}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={takePicture}>
						<Text style={styles.text}>Take Picture</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
		justifyContent: 'space-between',
	},
	button: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#ffffff80',
		padding: 10,
		borderRadius: 8,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
});
