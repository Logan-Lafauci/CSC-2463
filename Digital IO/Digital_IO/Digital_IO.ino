/*https://www.youtube.com/shorts/r7GLJr19GfI
Logan Lafauci 
3/30/2022
*/

// assigning pins
const int buttonPin = 2; 
const int buttonPin2 = 3;
const int ledPin =  5;
const int ledPin2 =  6;
const int ledPin3 =  7;
const int ledPin4 =  8;
int pattern = 0;
int light = 0;

//variables that will change
int buttonState = 0;        
int buttonState2 = 0;
int loopCount = 0;

unsigned long previousMillis = 0;
const long interval = 200;

void setup() {
  // initialize the LED pins as an output:
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
  // initialize the pushbutton pins as an input:
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbuttons value:
  unsigned long currentMillis = millis();
  
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    //pattern 1 makes the shape of a x 
    pattern = 1;
  } 
  else if(buttonState2 == HIGH) {
    //pattern 2 in the shape of a square
    pattern = 2;
  }

  //makes the pattern without the use of delays
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
   
    //x pattern
    if (pattern == 1) {
      if(light == 1)
      {
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, HIGH);
        light++;
      }
      else if(light == 2){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin2, HIGH);
        light++;
      }
      else if(light == 3){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin3, HIGH);
        light++;
      }
      else{
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin, HIGH);
        light = 1;
      }
    } 
    //square pattern
    else if(pattern == 2){
      if(light == 1)
      {
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin2, HIGH);
        light++;
      }
      else if(light == 2){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, HIGH);
        light++;
      }
      else if(light == 3){
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin3, HIGH);
        light++;
      }
      else{
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin4, LOW);
        digitalWrite(ledPin, HIGH);
        light = 1;
      }
    }
    //turns all light off
    else {
      digitalWrite(ledPin, LOW);
      digitalWrite(ledPin2, LOW);
      digitalWrite(ledPin3, LOW);
      digitalWrite(ledPin4, LOW);
    }
  }
}
