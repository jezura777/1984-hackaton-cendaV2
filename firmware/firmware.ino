#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <OneWire.h>
#include <SoilSensor.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; // I2C
#define LIGHT_SENSOR_PIN 0
// Add a 4k7 pull-up resistor to this pin
#define SOIL_SENSOR_PIN 14

OneWire oneWire(SOIL_SENSOR_PIN);
SoilSensor soilSensor(&oneWire);

unsigned long delayTime;

void setup() {
  Serial.begin(9600);
  Serial.println(F("BME280 + light test + soil"));

  bool status;

  // default settings
  // (you can also pass in a Wire library object like &Wire2)
  status = bme.begin(0x76);  
  if (!status) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
  analogSetAttenuation(ADC_11db);
  soilSensor.begin();
  Serial.println("-- Default Test --");
  delayTime = 500;

  Serial.println();
}


void loop() { 
  //printValues();
  craftAsendJSON();
  delay(delayTime);
}

void printValues() {
  Serial.print("---ABOVE GROUND SENSOR---");

  Serial.print("Temperature = ");
  Serial.print(bme.readTemperature());
  Serial.println(" *C");
  
  // Convert temperature to Fahrenheit
  /*Serial.print("Temperature = ");
  Serial.print(1.8 * bme.readTemperature() + 32);
  Serial.println(" *F");*/
  
  Serial.print("Pressure = ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");

  Serial.print("Approx. Altitude = ");
  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.println(" m");

  Serial.print("Humidity = ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  int analogValue = analogRead(LIGHT_SENSOR_PIN);
    Serial.print("Analog Value = ");
  Serial.print(analogValue);   // the raw analog reading

  // We'll have a few threshholds, qualitatively determined
  if (analogValue < 40) {
    Serial.println(" => Dark");
  } else if (analogValue < 800) {
    Serial.println(" => Dim");
  } else if (analogValue < 2000) {
    Serial.println(" => Light");
  } else if (analogValue < 3200) {
    Serial.println(" => Bright");
  } else {
    Serial.println(" => Very bright");
  }

  Serial.print("---GROUND SENSOR---");
  soilSensor.wakeUp();
  
  float temperature;
  soilSensor.readTemperatureCelsius(&temperature);
  Serial.print("Temperature:  ");
  Serial.print(temperature);
  Serial.println("°C");

  uint16_t moisture;
  soilSensor.readMoistureRaw(&moisture);
  Serial.print("Moisture:  ");
  Serial.print(moisture);
  Serial.println();
   
  soilSensor.sleep();
}
