const fs = require('fs');
const path = require('path');
const axios = require('axios');

const plantsFilePath = path.join(__dirname, './assets/data/Plants.json');

async function updatePlants() {
  try {
    const response = await axios.get('http://10.10.8.50/Kolik/GetData');
    const newData = response.data;

    const plantsData = JSON.parse(fs.readFileSync(plantsFilePath, 'utf8'));
    
    const updatedPlants = {
      plants: plantsData.plants.map((plant) =>
        plant.id === 1 ? { ...plant, ...newData } : plant
      )
    };

    fs.writeFileSync(plantsFilePath, JSON.stringify(updatedPlants, null, 2));

    console.log('Updated Plants.json with new data:', newData);
  } catch (error) {
    console.error('Error updating Plants.json:', error.message);
  }
}

setInterval(updatePlants, 500);
