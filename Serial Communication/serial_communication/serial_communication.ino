//Logan Lafauci
//4/11/2022
//https://www.youtube.com/shorts/-1AuxcJW5Y8
#include "PDMSerial.h";

PDMSerial pdm;

int sensorPin = A0;
int sensorData = 0;
int scaledData;

const int ledPin =  4;
const int ledPin2 =  5;
const int ledPin3 =  6;

void setup() {
  pinMode(sensorPin, INPUT);
  
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  sensorData = analogRead(sensorPin);
  scaledData = map(sensorData, 0, 1023, 0, 255);
  

  pdm.transmitSensor("a0", scaledData);
  pdm.transmitSensor("end");
  //Serial.println(sensorData);

  boolean newData = pdm.checkSerial();

  if(newData){
    if(pdm.getName().equals(String("color"))){
      int color = pdm.getValue();
      if(color == 1){
        digitalWrite(ledPin, HIGH);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
      }
      else if(color == 2){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, HIGH);
        digitalWrite(ledPin3, LOW);
      }
      else if(color == 3){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, HIGH);
      }
      Serial.println(color);
    }
  }
}
