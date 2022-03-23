let startTime;
let gameState = "wait";
let bugs = [];
let count;
let score = 0;
let speed = 2;
let direction = [-1, 1];
let sounds = new Tone.Players(
  {
    'splat': 'sample/splat.wav',
    'miss': 'sample/miss.wav'
  }
);
sounds.volume.value = -6;

var gain = new Tone.Gain().toDestination();
sounds.connect(gain);

Tone.Transport.bpm.value = 120;

let synth = new Tone.PolySynth().toDestination();
synth.volume.value = -25;

const over = [
  {'time': 0, 'note': ["C5", "E5", "A5"], 'duration': 1.5},
  {'time': 2, 'note': "C5", 'duration': '4n'},
  {'time': 2.25, 'note': "E5", 'duration': '4n'},
  {'time': 2.5, 'note': "G5", 'duration': '4n'},
  {'time': 3, 'note': "G5", 'duration': '4n'},
  {'time': 3.25, 'note': "E5", 'duration': '4n'},
  {'time': 3.5, 'note': "C5", 'duration': '4n'},
  {'time': 4, 'note': ["C5", "E5", "A5"], 'duration': 1.5},
  {'time': 6, 'note': "G5", 'duration': '4n'},
  {'time': 6.25, 'note': "E5", 'duration': '4n'},
  {'time': 6.5, 'note': "C5", 'duration': '4n'},
  {'time': 7, 'note': "C5", 'duration': '4n'},
  {'time': 7.25, 'note': "E5", 'duration': '4n'},
  {'time': 7.5, 'note': "G5", 'duration': '4n'}
];

const gameOver = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note.note, note.duration, time);
}, over);

let gameMusic = new Tone.Sequence((time, note) => {
  if(note != null) {
    synth.triggerAttackRelease(note, .25, time + 0.1);
  }
}, ['C4', 'C4', 'F4', 'G4', 'G4', 'C4', 'E3', 'E3', 'D4', 'C4', 'D3', 'D4']);

Tone.Transport.start();

function preload()
{
  spriteSheet = loadImage("bug.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  sounds.toDestination();

  for(i = 1; i <= 10; i++)
  {
    bugs.push(new Bug(spriteSheet, random(100, width-100), random(100, height-100), random(direction), (random(-1,1))));
  }
}

function timer()
{
  return int((millis() - startTime) / 1000);
}

function mouseClicked()
{
  bugCount = score;
  for(i = 0; i < count; i++)
  {
    if(gameState == "playing")
      bugs[i].squish();
  }
  if(bugCount == score)
  {
    playSample('miss');
  }
}

function draw() {
  background(255);
  count = bugs.length;


  if(gameState == "wait")
  {
    textSize(30);
    text('Click to start', (width/2 - 150) , 300);
    if(mouseIsPressed){
      Tone.start();
      startTime = millis();
      gameState = "playing";
    }
  }
  else if (gameState == "playing")
  {
    gameMusic.start("+.25");

    for(i = 0; i < count; i++)
    {
      bugs[i].draw();
    }

    let time = timer();
    text("Time: " +  (30 - time), 10, 30);
    text("Score: " +  score, width - 150, 30);
    if(time >= 30)
    {
      //sets game to end state 
      gameState = "end";
      startTime = millis();
      Tone.Transport.bpm.value = 120;
      gameOver.start("+.25");
      gameOver.loop = true;
      gameOver.loopEnd = 8;
    }
  }
  else if(gameState == "end")
  {
    gameMusic.stop();

    let time = timer();
    text('game over', (width/2 - 50), 300);
    text('Score: ' + score, (width/2 - 45), 350);
    text('Click to play again', (width/2 - 100), 400);

    //reset the game 
    if(mouseIsPressed && time >= 2){
      startTime = millis();
      gameState = "playing";
      score = 0;
      speed = 2;
      bugs.splice(0, (count - 10));
      for(i = 0; i < 10 ; i++)
      {
        bugs[i].alive = true;
      }
      gameOver.stop();
    }
  }
}

function playSample(sound)
{
  sounds.player(sound).start();
}

class Bug
{

  constructor(spriteSheet, x, y, horizontal, vertical)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x; 
    this.y = y;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.alive = true;
  }
  
  //handles what state the bug is in
  animate()
  {
    //walking
    if(this.alive)
    {
      image(this.spriteSheet, 0, 0, 75, 75, 28 * this.sx, 0, 27, 28);
      if(frameCount %3 == 0)
        this.sx = (this.sx + 1) % 9;
      this.x += this.horizontal * speed;
      this.y += this.vertical * speed;
    }
    //squished
    else if(!this.alive)
    {
      image(this.spriteSheet, 0, 0, 75, 75, 416, 0, 30, 28);
    }
  }

  //figures out the direction the bug should be facing. Can return to later to figure out a way for more precise facing directions
  angle()
  {
    if(this.horizontal > 0)
    {
      if(this.vertical > 0.2)
        return 135;
      else if (this.vertical < -0.2)
        return 45;
      else 
        return 90;
    }
    else if(this.horizontal < 0)
    {
      if(this.vertical > 0.2)
        return 225;
      else if (this.vertical < -0.2)
        return 315;
      else 
        return 270;
    }
    return 0;
  }

  draw() {
    push();
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.angle());
    this.animate();

    //change moving direction when hitting a wall
    if(this.x > width-20 && this.alive)
    {
      this.horizontal = -1;
      this.vertical = random(-1, 1);
    }
    if(this.x < 20 && this.alive)
    {
      this.horizontal = 1;
      this.vertical = random(-1, 1);
    }
    if(this.y > height-20 && this.alive)
    {
      this.vertical = -1;
      this.horizontal = random(direction);
    }
    if(this.y < 20 && this.alive)
    {
      this.vertical = 1;
      this.horizontal = random(direction);
    }
    pop();
  }

  squish()
  {
    if((mouseX >= this.x - 40 && mouseX <= this.x + 40) && (mouseY >= this.y - 50 && mouseY <= this.y + 50) && this.alive)
    {
      this.alive = false;
      score ++;
      speed += .25;
      bugs.push(new Bug(spriteSheet, random(100, width-100), random(100, height-100), random(direction), (random(-1,1))));
      Tone.Transport.bpm.value+= 3;
      playSample('splat');
    }
  }
}