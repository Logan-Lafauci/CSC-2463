let spriteSheet;
let yetiSpriteSheet;
let guy;
let guy2;
let guy3;
let girl;
let girl2;
let girl3;
let van;
let van2;
let van3;
let yellow;
let yellow2;
let yellow3
let meat;
let meat2;
let meat3;


function preload(){
  guySpriteSheet = loadImage("SpelunkyGuy.png");
  girlSpriteSheet = loadImage("Green.png");
  vanSpriteSheet = loadImage("van.png");
  yellowSpriteSheet = loadImage("yellow.png");
  meatSpriteSheet = loadImage("meatGuy.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  let min = 40;
  let maxX = width-40;
  let maxY = height-40;


  //all of the sprites that appear
  guy = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  guy2 = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  guy3 = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  girl = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY),random(3, 6));
  girl2 = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  girl3 = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  van = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  van2 = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  van3 = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  yellow = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  yellow2 = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  yellow3 = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  meat = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  meat2 = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
  meat3 = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY), random(3, 6));
}

function draw() {
  background(255);

  guy.draw();
  guy2.draw();
  guy3.draw();
  girl.draw();
  girl2.draw();
  girl3.draw();
  van.draw();
  van2.draw();
  van3.draw();
  yellow.draw();
  yellow2.draw();
  yellow3.draw();
  meat.draw();
  meat2.draw();
  meat3.draw();
}

class Charachter
{

  constructor(spriteSheet, x, y, speed)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x; 
    this.y = y;
    this.facing = 1;
    this.speed = speed;
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    image(this.spriteSheet, 0, 0, 75, 75, 80 * this.sx, 0, 80, 80);  
  
    //hold arrow keys to move and a release to reset animation
    if(keyIsDown(RIGHT_ARROW) && frameCount %3 == 0)
    {
      this.sx = (this.sx + 1) % 8;
      this.x += this.speed;
      this.facing = 1;
    }
    else if(keyIsDown(LEFT_ARROW) && frameCount %3 == 0)
    {
  
      this.sx = (this.sx + 1) % 8;
      this.x -= this.speed;
      this.facing = -1;
    }
    else if(! (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)))
    {
      this.sx = 0;
    }

    //wrap around when the sprites leave the canvas
    if(this.x > width + 20)
    {
      this.x = -20;
    }
    if(this.x < -20)
    {
      this.x = width + 20;
    }


    pop();
  }

}