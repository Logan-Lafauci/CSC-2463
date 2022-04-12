const int ledPin = 11;

int ledVal;
int readVal;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  readVal = analogRead(A0);
  Serial.print("analog input:");
  Serial.println(readVal);
  
  ledVal = map(readVal, 0, 1024, 0, 255);
  Serial.print("led output:");
  Serial.println(ledVal);
  analogWrite(ledPin, ledVal);
}
