import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const AnimatedProgressBar = ({ progress, color }) => {
	const animation = useRef(new Animated.Value(0)).current;

	// Clamp the progress value between 0 and 100
	const clampedProgress = Math.min(Math.max(progress, 0), 100);

	useEffect(() => {
		Animated.timing(animation, {
			toValue: clampedProgress,
			duration: 500,
			useNativeDriver: false,
		}).start();
	}, [clampedProgress]);

	const widthInterpolated = animation.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.innerBar, { backgroundColor: color, width: widthInterpolated }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 20,
		backgroundColor: '#e0e0df',
		borderRadius: 10,
		overflow: 'hidden',
		marginBottom: 10,
	},
	innerBar: {
		height: '100%',
	},
	label: {
		position: 'absolute',
		width: '100%',
		textAlign: 'center',
		color: 'black',
	},
});

export default AnimatedProgressBar;
