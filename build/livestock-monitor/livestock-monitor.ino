// IoT Livestock Monitoring System
// Arduino Uno with DHT11 + LM35 + two potentiometers (activity, heart rate)

#include <DHT.h>

// Pin definitions (match the provided wiring)
#define DHTPIN 2          // DHT11 data pin
#define DHTTYPE DHT11     // DHT sensor type
#define LM35_PIN A0       // LM35 analog output (BT)
#define ACTIVITY_PIN A1   // RV2 potentiometer (ACP)
#define HRP_PIN A2        // RV1 potentiometer (HRP)

// Alert thresholds
#define BODY_TEMP_ALERT 39.5
#define ACTIVITY_LOW_PCT 20
#define HRP_LOW_BPM 45
#define HRP_HIGH_BPM 120

DHT dht(DHTPIN, DHTTYPE);

float readLm35C() {
  int raw = analogRead(LM35_PIN);
  float voltage = raw * (5.0 / 1023.0);
  return voltage * 100.0; // LM35: 10mV per C
}

int readActivityPercent() {
  int raw = analogRead(ACTIVITY_PIN);
  return map(raw, 0, 1023, 0, 100);
}

int readHeartRateBpm() {
  int raw = analogRead(HRP_PIN);
  return map(raw, 0, 1023, 40, 140);
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("Livestock Monitor");
  Serial.println("Starting...");
  Serial.println("Livestock monitor started");
}

void loop() {
  float humidity = dht.readHumidity();
  float ambientTemp = dht.readTemperature();
  float bodyTemp = readLm35C();
  int activityPct = readActivityPercent();
  int heartRate = readHeartRateBpm();

  if (isnan(humidity) || isnan(ambientTemp)) {
    Serial.println("Sensor Error: DHT11 read failed");
    Serial.println("DHT11 error");
    Serial.println("Check sensor");
    delay(2000);
    return;
  }

  Serial.print("BT:");
  Serial.print(bodyTemp, 1);
  Serial.print("C, AT:");
  Serial.print(ambientTemp, 1);
  Serial.print("C, H:");
  Serial.print(humidity, 0);
  Serial.print("%, ACT:");
  Serial.print(activityPct);
  Serial.print("%, HRP:");
  Serial.print(heartRate);
  Serial.println("bpm");

  bool bodyAlert = bodyTemp > BODY_TEMP_ALERT;
  bool activityLow = activityPct < ACTIVITY_LOW_PCT;
  bool hrpAlert = (heartRate < HRP_LOW_BPM || heartRate > HRP_HIGH_BPM);

  static bool showAlt = false;
  char btStr[6];
  char atStr[6];
  char line1[32];
  char line2[32];
  int humidityPct = (int)(humidity + 0.5);

  dtostrf(bodyTemp, 4, 1, btStr);
  dtostrf(ambientTemp, 4, 1, atStr);

  if (!showAlt) {
    snprintf(line1, sizeof(line1), "BT:%sC AT:%s", btStr, atStr);
    snprintf(line2, sizeof(line2), "H:%d%% ACT:%d%%", humidityPct, activityPct);
  } else {
    snprintf(line1, sizeof(line1), "HR:%dbpm ACT:%d", heartRate, activityPct);
    snprintf(line2, sizeof(line2), "ALERT:%s", (bodyAlert || activityLow || hrpAlert) ? "YES" : "NO");
  }
  Serial.println(line1);
  Serial.println(line2);
  Serial.println("--");
  showAlt = !showAlt;

  if (bodyAlert || activityLow || hrpAlert) {
    Serial.print("ALERT: ");
    if (bodyAlert) {
      Serial.print("High body temp ");
      Serial.print(bodyTemp, 1);
      Serial.print("C ");
    }
    if (activityLow) {
      Serial.print("Low activity ");
      Serial.print(activityPct);
      Serial.print("% ");
    }
    if (hrpAlert) {
      Serial.print("Heart rate ");
      Serial.print(heartRate);
      Serial.print("bpm ");
    }
    Serial.println();
  }

  delay(2000);
}
