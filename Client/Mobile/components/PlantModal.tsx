import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

type Plant = {
  id: number;
  name: string;
  image: string;
  qualityOfAir: number;
  co2: number;
  airTemperature: number;
  soilMoisture: number;
  soilTemperature: number;
};

type Props = {
  plant: Plant | null;
  onClose: () => void;
};

export function PlantModal({ plant, onClose }: Props) {
  if (!plant) return null;

  return (
    <Modal
      visible={!!plant}
      animationType='slide'
      onRequestClose={onClose}
    >
      <ScrollView>
        <View>
          <Image source={{ uri: plant.image }} style={{ width: '100%', height: 300 }} />
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 20, right: 20 }}>
            <Ionicons name='close' size={24} color='#000' />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{plant.name}</Text>
          
          <View style={{ marginVertical: 10 }}>
            <Text className='font-sans text-lg'>
              Quality of Air: {plant.qualityOfAir}%
            </Text>
            <ProgressBar
              progress={plant.qualityOfAir / 100}
              color='blue'
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className='font-sans text-lg'>
              CO₂ Level: {plant.co2} ppm
            </Text>
            <ProgressBar
              progress={plant.co2 / 500}
              color='green'
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className='font-sans text-lg'>
              Air Temperature: {plant.airTemperature}°C
            </Text>
            <ProgressBar
              progress={plant.airTemperature / 50}
              color='red'
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className='font-sans text-lg'>
              Soil Moisture: {plant.soilMoisture}%
            </Text>
            <ProgressBar
              progress={plant.soilMoisture / 100}
              color='brown'
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className='font-sans text-lg'>
              Soil Temperature: {plant.soilTemperature}°C
            </Text>
            <ProgressBar
              progress={plant.soilTemperature / 50}
              color='orange'
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
