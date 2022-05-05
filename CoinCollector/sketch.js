//https://www.youtube.com/watch?v=5HOnnstKtwg
//p5 and game mechanics
let startTime;
let gameState = "wait";
let coins = [];
let thePlayer;
let count;
let totalScore = 0;
let score = 0;
let multiplier = 1;
let speed = 2;
let timeLeft = 30;
let direction = [-1, 1];

//Tone.js
let sounds = new Tone.Players(
  {
    'collect': 'sample/collect.wav',
    'register': 'sample/register.mp3'
  }
);
sounds.volume.value = -6;

var gain = new Tone.Gain().toDestination();
sounds.connect(gain);

Tone.Transport.bpm.value = 120;

const chorus = new Tone.Chorus(4, 1, 0.5).toDestination().start();
let synth = new Tone.PolySynth().connect(chorus);
synth.volume.value = -25;

const dist = new Tone.Distortion(.8).toDestination();
let synth2 = new Tone.MembraneSynth().connect(dist);
synth2.volume.value = -25;

let gameOver = new Tone.Sequence((time, note) => {
  if(note != null) {
    synth2.triggerAttackRelease(note, .5, time + 0.1);
  }
}, ['C4', 'C3', 'C2', null, 'D4', 'D3', 'D2', null, 'E4', 'E3', 'E2', null, 'G3', 'G4', 'G5', 'G6']);

let gameMusic = new Tone.Sequence((time, note) => {
  if(note != null) {
    synth.triggerAttackRelease(note, .25, time + 0.1);
  }
}, ['C4', 'C4', 'F4', 'G4', 'G4', 'C4', 'E3', 'E3', 'D4', 'C4', 'D3', 'D4']);

Tone.Transport.start();

//hardware
let serialPDM;
let portName = "COM3";
let x;
let y;
let button = 1;

//store prices
let addCost = 3;
let timeCost = 3;
let multCost = 3;
let moveCost = 3;

function preload()
{
  spriteSheet = loadImage("coin.png");
  playerSheet = loadImage("player.png");
}

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  sounds.toDestination();

  thePlayer = new Player(playerSheet);
  for(i = 1; i <= 3; i++)
  {
    coins.push(new Coin(spriteSheet, random(100, width-100), random(100, height-100), random(direction), (random(-1,1))));
  }
}

function timer()
{
  return int((millis() - startTime) / 1000);
}

//this controls the shop by using the keyboard
function keyReleased()
{
  if(key == '1' && score >= Math.floor(addCost))
  {
    playSample('register');
    coins.push(new Coin(spriteSheet, random(100, width-100), random(100, height-100), random(direction), (random(-1,1))));
    speed += .5;
    score -= Math.floor(addCost);
    addCost *= 2;
    serialPDM.transmit('spent', 1);
  }
  if(key == '2' && score >= Math.floor(timeCost))
  {
    playSample('register');
    timeLeft += 10;
    score -= Math.floor(timeCost);
    timeCost *= 1.25;
    serialPDM.transmit('spent', 1);
  }
  if(key == '3' && score >= Math.floor(multCost))
  {
    playSample('register');
    multiplier *= 1.25;
    speed += .25;
    score -= Math.floor(multCost);
    multCost *= 1.35;
    serialPDM.transmit('spent', 1);
  }
  if(key == '4' && score >= Math.floor(moveCost))
  {
    playSample('register');
    thePlayer.addSpeed();
    score -= Math.floor(moveCost);
    moveCost *= 1.75;
    serialPDM.transmit('spent', 1);
  }
}

function draw() {
  background(115);
  count = coins.length;

  if(gameState == "wait")
  {
    textSize(50);
    fill(246, 234, 63);
    text('Coin Collector', (width/2 - 150) , 300);
    fill(0);
    textSize(30);
    text('Push Joystick To Start', (width/2 - 140) , 350);
    if(sensor.button){
      Tone.start();
      startTime = millis();
      gameState = "playing";
    }
  }

  else if (gameState == "playing")
  {
    gameMusic.start("+.25");
    synth.volume.rampTo(-20, 5);
    
    //handles coins
    for(i = 0; i < count; i++)
    {
      previousScore = score;
      coins[i].draw();
      coins[i].collect(thePlayer);
    }
    
    //cursor will be replaced with animated charchter
    thePlayer.draw();

    let time = timer();
    text("Time: " +  (timeLeft - time), 10, 30);
    text("Money: " +  score, width - 200, 30);
    text("1. Coin +1: " +  Math.floor(addCost), width * .2 - 200, 30);
    text("2. Time Up: " +  Math.floor(timeCost), width * .4 - 200, 30);
    text("3. Coin Amount: " +  Math.floor(multCost), width * .6 - 200, 30);
    text("4. Speed Up: " +  Math.floor(moveCost), width * .8 - 200, 30);

    if(time >= timeLeft)
    {
      //sets game to end state 
      gameState = "end";
      startTime = millis();
      Tone.Transport.bpm.value = 120;
      gameMusic.stop("+.25");
      synth.volume.rampTo(-40, 5);
    }
  }

  else if(gameState == "end")
  {
    gameOver.start("+.25");
    synth2.volume.rampTo(-25, 5);

    let time = timer();
    text('game over', (width/2 - 50), 300);
    text('Score: ' + totalScore, (width/2 - 45), 350);
    text('Click to play again', (width/2 - 100), 400);

    //reset the game 
    if(sensor.button && time >= 2){
      gameOver.stop("+.25");
      synth2.volume.rampTo(-40, 5);
      thePlayer.x = width/2;
      thePlayer.y = height/2;
      startTime = millis();
      gameState = "playing";
      score = 0;
      totalScore = 0;
      addCost = 3;
      timeCost = 3;
      multCost = 3;
      moveCost = 3;
      thePlayer.playerSpeed = 1;
      multiplier = 1;
      speed = 2;
      timeLeft = 30;
      coins.splice(0, coins.length - 3);
      for(i = 0; i < 3 ; i++)
      {
        coins[i].x = random(100, width-100);
        coins[i].y = random(100, height-100);
      }
    }
  }
}

function playSample(sound)
{
  sounds.volume.value = -16;
  sounds.player(sound).stop();
  sounds.player(sound).start();
}

class Player
{
  constructor(spriteSheet)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.sy = 0;
    this.x = width/2; 
    this.y = height/2;
    this.playerSpeed = 1;
    this.movementx = 0;
    this.movementY = 0;
    this.absX = 0;
    this.absY = 0;
    this.idle = true;
  }

  animate()
  {
    image(this.spriteSheet, 0, 0, 75, 81.05, 96 * this.sx, this.sy, 96, 103.7);
    if(frameCount % 10 == 0 && this.idle)
    {
      this.sx = (this.sx + 1) % 3;
      this.sy = 0;
    }
    else if(frameCount %3 == 0 && !this.idle)
    {
      this.sx = (this.sx + 1) % 10;
      if(Math.abs(this.movementY) - Math.abs(this.movementX) > 0)
      {
        if(this.movementY > 0)
        {
          this.sy = 624;
        }
        else
        {
          this.sy = 416;
        }
      }
      else if(Math.abs(this.movementX) - Math.abs(this.movementY) > 0)
      {
        if(this.movementX > 0)
        {
          this.sy = 726.35;
        }
        else
        {
          this.sy = 520.5;
        }
      }
    }
    
  }

  draw()
  {
    push();
    if(sensor.x > 530 || sensor.x < 500)
    {
      this.movementX = (sensor.x - 512) / 512 * 5 * this.playerSpeed;
      if((this.x <=20 && this.movementX > 0) || (this.x >= width - 20 && this.movementX < 0) || (this.x > 20 && this.x < width - 20))
        this.x += this.movementX;
    }
    if(sensor.y > 530 || sensor.y < 500)
    {
      this.movementY = (sensor.y - 512) / 512 * 5 * this.playerSpeed;
      if((this.y <=20 && this.movementY < 0) || (this.y >= height - 20 && this.movementY > 0) || (this.y > 20 && this.y < height - 20))
        this.y -= this.movementY;
    }
    if(!(sensor.y > 530 || sensor.y < 500) && !(sensor.x > 530 || sensor.x < 500))
    {
      this.idle = true;
    }
    else
    {
      this.idle = false;
    }
    //ellipse (this.x, this.y, 20, 20);
    translate(this.x, this.y);
    this.animate();
    pop();
  }

  addSpeed()
  {
    this.playerSpeed += .075;
  }
}

class Coin
{

  constructor(spriteSheet, x, y, horizontal, vertical)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x; 
    this.y = y;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
  
  animate()
  {
    //spinning
    image(this.spriteSheet, 0, 0, 75, 75, 200 * this.sx, 0, 200, 220);
    if(frameCount %3 == 0)
      this.sx = (this.sx + 1) % 6;
    this.x += this.horizontal * speed;
    this.y += this.vertical * speed;
  }

  draw() {
    push();
    translate(this.x, this.y);
    this.animate();

    //change moving direction when hitting a wall
    if(this.x > width-20)
    {
      this.horizontal = -1;
      this.vertical = random(-1, 1);
    }
    if(this.x < 20)
    {
      this.horizontal = 1;
      this.vertical = random(-1, 1);
    }
    if(this.y > height-20)
    {
      this.vertical = -1;
      this.horizontal = random(direction);
    }
    if(this.y < 20)
    {
      this.vertical = 1;
      this.horizontal = random(direction);
    }
    pop();
  }

  collect(control)
  {
    if((control.x >= this.x - 60 && control.x <= this.x + 60) && (control.y >= this.y - 70 && control.y <= this.y + 70))
    {
      playSample('collect');
      score += Math.ceil(multiplier);
      totalScore += Math.ceil(multiplier);
      this.x = random(100, width-100);
      this.y = random(100, height-100);
    }
  }
}