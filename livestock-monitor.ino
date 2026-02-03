// IoT Livestock Monitoring System
// ATmega328P (Arduino Uno) with DHT22 sensor

#include <DHT.h>
#include <LiquidCrystal.h>

// Pin definitions
#define DHTPIN 2          // DHT22 data pin
#define DHTTYPE DHT22     // DHT sensor type
#define LED_NORMAL 8      // Green LED - Normal conditions
#define LED_WARNING 9     // Yellow LED - Warning
#define LED_ALERT 10      // Red LED - Alert/Danger
#define BUZZER_PIN 11     // Buzzer for alerts

// Temperature thresholds for livestock (Celsius)
#define TEMP_MIN 15.0     // Below this = too cold
#define TEMP_MAX 30.0     // Above this = too hot
#define HUMIDITY_MIN 40.0 // Below this = too dry
#define HUMIDITY_MAX 80.0 // Above this = too humid

// Initialize sensors and display
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal lcd(12, 13, 4, 5, 6, 7); // RS, E, D4, D5, D6, D7

void setup() {
  Serial.begin(9600);
  
  // Initialize DHT sensor
  dht.begin();
  
  // Initialize LCD (16x2)
  lcd.begin(16, 2);
  lcd.print("Livestock Mon.");
  lcd.setCursor(0, 1);
  lcd.print("Initializing...");
  
  // Setup LED and buzzer pins
  pinMode(LED_NORMAL, OUTPUT);
  pinMode(LED_WARNING, OUTPUT);
  pinMode(LED_ALERT, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  // Test LEDs
  digitalWrite(LED_NORMAL, HIGH);
  delay(300);
  digitalWrite(LED_WARNING, HIGH);
  delay(300);
  digitalWrite(LED_ALERT, HIGH);
  delay(300);
  digitalWrite(LED_NORMAL, LOW);
  digitalWrite(LED_WARNING, LOW);
  digitalWrite(LED_ALERT, LOW);
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Read sensor data
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  // Check if readings are valid
  if (isnan(humidity) || isnan(temperature)) {
    lcd.setCursor(0, 0);
    lcd.print("Sensor Error!   ");
    lcd.setCursor(0, 1);
    lcd.print("Check Connection");
    digitalWrite(LED_ALERT, HIGH);
    tone(BUZZER_PIN, 1000, 200);
    delay(2000);
    return;
  }
  
  // Display readings on LCD
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperature, 1);
  lcd.print("C  ");
  
  lcd.setCursor(0, 1);
  lcd.print("Hum:  ");
  lcd.print(humidity, 1);
  lcd.print("%  ");
  
  // Send data to serial (for IoT gateway)
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" C, Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  
  // Evaluate conditions and set alerts
  evaluateConditions(temperature, humidity);
  
  delay(2000); // Update every 2 seconds
}

void evaluateConditions(float temp, float hum) {
  bool tempAlert = (temp < TEMP_MIN || temp > TEMP_MAX);
  bool humAlert = (hum < HUMIDITY_MIN || hum > HUMIDITY_MAX);
  bool tempWarning = (temp < TEMP_MIN + 2 || temp > TEMP_MAX - 2);
  bool humWarning = (hum < HUMIDITY_MIN + 5 || hum > HUMIDITY_MAX - 5);
  
  // Reset all indicators
  digitalWrite(LED_NORMAL, LOW);
  digitalWrite(LED_WARNING, LOW);
  digitalWrite(LED_ALERT, LOW);
  
  if (tempAlert || humAlert) {
    // ALERT condition - dangerous for livestock
    digitalWrite(LED_ALERT, HIGH);
    tone(BUZZER_PIN, 2000, 100); // Short beep
    Serial.println("ALERT: Dangerous conditions!");
    
    if (tempAlert) {
      Serial.print("  Temperature ");
      Serial.print(temp < TEMP_MIN ? "too LOW" : "too HIGH");
      Serial.println("!");
    }
    if (humAlert) {
      Serial.print("  Humidity ");
      Serial.print(hum < HUMIDITY_MIN ? "too LOW" : "too HIGH");
      Serial.println("!");
    }
    
  } else if (tempWarning || humWarning) {
    // WARNING condition - approaching unsafe levels
    digitalWrite(LED_WARNING, HIGH);
    Serial.println("WARNING: Monitor conditions closely");
    
  } else {
    // NORMAL condition - optimal for livestock
    digitalWrite(LED_NORMAL, HIGH);
    Serial.println("STATUS: Normal - Conditions optimal");
  }
}
