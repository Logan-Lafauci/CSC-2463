//https://www.youtube.com/watch?v=jw4crzEWeGI
//Logan Lafauci
//4/5/22

const int ledPin = 11;
int ledVal;
int readVal;
int score1 = 0;
int score2 = 0;
int playing = false;
int targetVal;
int player;
unsigned long currentMillis = 0;
unsigned long timer = 0;
const long interval = 200;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  targetVal = random (50,240);
}

void loop() {
  // put your main code here, to run repeatedly:
  readVal = analogRead(A0);
  //top value 1023;
  
  ledVal = map(readVal, 0, 1024, 0, 255);
  //top value 254

  //the game wants a person to get
  if(playing){
    //player 1's turn
    if(player == 1){
      if(ledVal > score1){
        score1 = ledVal;
      }

      //ends turn without going over and resets position for player 2
      if(readVal == 0){
        currentMillis = millis();
        if((currentMillis - timer) >= 3000){
          player = 2;
          analogWrite(ledPin, 0);
          delay(1000);
          timer = millis();
          Serial.println("Player 2");
        }
      }  
      else{
        timer = millis();
      }

      //light indicates how close and turns off when the player goes over
      if(score1 < targetVal){
        analogWrite(ledPin, 254 - (targetVal - score1));
      }
      else{
        analogWrite(ledPin, 0);
      }
    }
    //player 2's turn
    if(player == 2){
      if(ledVal > score2){
        score2 = ledVal;
      }

      //ends turn without going over
      if(readVal == 0){
        currentMillis = millis();
        if((currentMillis - timer) >= 3000){
          playing = false;
          analogWrite(ledPin, 0);
          delay(1000);
          timer = millis();
          Serial.println("Game Over");
        }
      }  
      else{
        timer = millis();
      }
      
      if(score2 < targetVal){
        analogWrite(ledPin, 254 - (targetVal - score2));
      }
      //light indicates how close and turns off when the player goes over and ends the game
      else{
        analogWrite(ledPin, 0);
        playing = false;
        delay(1000);
        timer = millis();
        Serial.println("Game Over");
      }
    }
  }
  else{
    //this else handles starting the game and showing the results of the previous game
    if(readVal == 0){
      currentMillis = millis();
      if((currentMillis - timer) >= 5000){
        playing = true;
        player = 1;
        score1 = 0;
        score2 = 0;
        targetVal = random (50,240);
        timer = millis();
        Serial.println("Player 1");
      }
    }  
    //this rests the timer for starting the game and displays results
    else{
      //light blinks once to indicate player 1 wins
      if((score1 > score2 && score1 <= targetVal) || (score2 >= targetVal && score1 < targetVal)){
        analogWrite(ledPin, 255);
        delay(1000);
        analogWrite(ledPin, 0);
        delay(1000);
        Serial.println("Player 1 wins");
      }
      //light blinks twice to indicate player 2 wins
      else if((score2 > score1 && score2 <= targetVal) || (score1 > targetVal && score2 < targetVal)){
        analogWrite(ledPin, 255);
        delay(250);
        analogWrite(ledPin, 0);
        delay(250);
        analogWrite(ledPin, 255);
        delay(250);
        analogWrite(ledPin, 0);
        delay(1000);
        Serial.println("Player 2 wins");
        Serial.println(score2 > score1 && score2 <= targetVal);
        Serial.println(score1 > targetVal && score2 <= targetVal);
      }
      //light is off to indicate no-one wins
      else
      {
        analogWrite(ledPin, 0);
      }
      timer = millis();
    }
  }
}
