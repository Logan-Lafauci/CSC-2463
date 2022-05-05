//Logan Lafauci
//4/19/2022
//https://www.youtube.com/watch?v=-djt3liUwmQ
#include "PDMSerial.h";

PDMSerial pdm;

int sensorPin = A0;
int sensorPin2 = A1;

int xSensorData;
int ySensorData;
int buttonState = 0;
int pButtonState;

const int buttonPin = 2; 
const int ledPin =  5;

unsigned long previousMillis = 0;
const long interval = 200;

void setup() {
  pinMode(sensorPin, INPUT);
  pinMode(sensorPin2, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  
  pinMode(ledPin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  unsigned long currentMillis = millis();
  ySensorData = analogRead(sensorPin);
  xSensorData = analogRead(sensorPin2);
  buttonState = digitalRead(buttonPin);
//  scaledData = map(sensorData, 0, 1023, 0, 255);
  

  pdm.transmitSensor("x", xSensorData);
  pdm.transmitSensor("end");
  pdm.transmitSensor("y", ySensorData);
  pdm.transmitSensor("end");

  if (buttonState == LOW && pButtonState == HIGH) {
    pdm.transmitSensor("button", true);
    pdm.transmitSensor("end");
  }
  else{
    pdm.transmitSensor("button", false);
    pdm.transmitSensor("end");
  }

  if (currentMillis - previousMillis >= interval){
    digitalWrite(ledPin, LOW);
  }

  boolean newData = pdm.checkSerial();

  if(newData){
    if(pdm.getName().equals(String("squished"))){
      bool squished = pdm.getValue();
      if(squished == 1){
        digitalWrite(ledPin, HIGH);
        previousMillis = millis();
        squished = 0;
      }
      Serial.println(squished);
    }
  }
  pButtonState = buttonState;
}
