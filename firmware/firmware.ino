#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <OneWire.h>
#include <SoilSensor.h>
#include <WiFi.h>
#include <esp_wifi.h>
#include <stdio.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define SEALEVELPRESSURE_HPA (1013.25)
#define JSON_LENGHT 1024

Adafruit_BME280 bme; // I2C
#define LIGHT_SENSOR_PIN 0
// Add a 4k7 pull-up resistor to this pin
#define SOIL_SENSOR_PIN 14

OneWire oneWire(SOIL_SENSOR_PIN);
SoilSensor soilSensor(&oneWire);

unsigned long delayTime;

const char* ssid = "hackathon";
const char* password = "att4hack";
const uint16_t port = 80;
const char * host = "http://10.10.8.50/Kolik/Endpoint";

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

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("WIFI CONNECTING...");
  }
 
  Serial.print("WiFi connected with IP: ");
  Serial.println(WiFi.localIP());
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

void craftAsendJSON()
{
  char json[JSON_LENGHT];
  String str = craftJSON((String)json);
  //Serial.print(json);
  
  sendJSON(str);
}
String craftJSON(String str)
{
  int Light = analogRead(LIGHT_SENSOR_PIN);
  float TemperatureGround;
  uint16_t MoistureGround;
  uint8_t baseMac[6];


  soilSensor.wakeUp();

  soilSensor.readTemperatureCelsius(&TemperatureGround);
  soilSensor.readMoistureRaw(&MoistureGround);

  soilSensor.sleep();

  // snprintf(str,JSON_LENGHT,"body\n\r{\n\r\"Mac\": \"%02x:%02x:%02x:%02x:%02x:%02x\",\n\r\"TeplotaV\": %lf,\n\r\"Tlak\": %lf,\n\r\"Vyska\": %lf,\n\r\"Vlhkost\": %lf,\n\r\"Svetlo\": %d,\n\r\"TeplotaZ\": %f,\n\r\"Voda\": %ld,\n\r\}\n\r",
  //                 baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5],
  //                 bme.readTemperature(),
  //                 bme.readPressure() / 100.0F,
  //                 bme.readAltitude(SEALEVELPRESSURE_HPA),
  //                 bme.readHumidity(),
  //                 Light,
  //                 TemperatureGround,
  //                 MoistureGround);

        char MAC[64];
        snprintf(MAC, 64, "%02x:%02x:%02x:%02x:%02x:%02x", baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["Mac"] = MAC;
        jsonDoc["TeplotaV"] = bme.readTemperature();
        jsonDoc["Tlak"] = bme.readPressure()/100.0f;
        jsonDoc["Vyska"] = bme.readAltitude(SEALEVELPRESSURE_HPA);
        jsonDoc["Vlhkost"] = bme.readHumidity();
        jsonDoc["Svetlo"] = Light;
        jsonDoc["TeplotaZ"] = TemperatureGround;
        jsonDoc["Voda"] = MoistureGround;
            Serial.println("CRAFTED!");


        // Serialize JSON to string
        serializeJson(jsonDoc, str);
            Serial.println("SERIALIZED!");
            return str;


}

void readMacAddress(uint8_t *baseMac){
  esp_err_t ret = esp_wifi_get_mac(WIFI_IF_STA, baseMac);
  if (ret == ESP_OK) {
    return;
  } else {
    Serial.println("Failed to read MAC address");
    while (1);
  }
}

void sendJSON(String json)
{
//   WiFiClient client;

//   if (!client.connect(host, port)) {

//       Serial.println("Connection to host failed");

//       return;
//   }

//     Serial.println("Connected to server successful!");
//  //client.print(json)
//     client.print("POST /Kolik/Endpoint HTTP/1.1\r\n"); // Replace with your endpoint
//     client.print("Host: 10.10.8.50\r\n"); // Replace with your server
//     client.print("Content-Type: application/json\r\n");
//     client.print("Content-Length: ");
//     client.print(json.length());
//     client.print("\r\n");
//     client.print("Connection: close\r\n\r\n");
//     client.print(json); // Send the JSON data

//   while (client.connected() || client.available()) {
//     if (client.available()) {
//       String line = client.readStringUntil('\n');
      
//       // Print the first line of the response
//       if (line.startsWith("HTTP/")) {
//         Serial.println(line); // This line contains the HTTP response code
        
//         // Optionally, extract the response code
//         int responseCode = line.substring(9, 12).toInt(); // Extract the response code
//         Serial.print("HTTP Response Code: ");
//         Serial.println(responseCode);
//       }
//     }

  // Serial.println("Disconnecting...");
  // client.stop();
  if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
  
        http.begin(host);
        http.addHeader("Content-Type", "application/json");

        // Send the request
        int httpResponseCode = http.POST(json);
            Serial.println("SENT!");


        // Check the response
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        } else {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);
        }

        // Close connection
        http.end();
    } else {
        Serial.println("WiFi Disconnected");
    }

}