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
  createCanvas(1900, 900);
  imageMode(CENTER);

  guy = new Charachter(guySpriteSheet, 300, 300);
  guy2 = new Charachter(guySpriteSheet, 750, 350);
  guy3 = new Charachter(guySpriteSheet, 1500, 80);
  girl = new Charachter(girlSpriteSheet, 950, 600);
  girl2 = new Charachter(girlSpriteSheet, 1600, 250);
  girl3 = new Charachter(girlSpriteSheet, 475, 125);
  van = new Charachter(vanSpriteSheet, 450, 450);
  van2 = new Charachter(vanSpriteSheet, 1300, 200);
  van3 = new Charachter(vanSpriteSheet, 1450, 600);
  yellow = new Charachter(yellowSpriteSheet, 280, 575);
  yellow2 = new Charachter(yellowSpriteSheet, 1200, 80);
  yellow3 = new Charachter(yellowSpriteSheet, 1050, 400);
  meat = new Charachter(meatSpriteSheet, 850, 100);
  meat2 = new Charachter(meatSpriteSheet, 1500, 400);
  meat3 = new Charachter(meatSpriteSheet, 600, 550);
}

function keyReleased()
{
  sx = 0;
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

  constructor(spriteSheet, x, y)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x; 
    this.y = y;
    this.facing = 1;
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    image(this.spriteSheet, 0, 0, 75, 75, 80 * this.sx, 0, 80, 80);  
  
    if(keyIsDown(RIGHT_ARROW) && frameCount %3 == 0)
    {
      this.sx = (this.sx + 1) % 8;
      this.x += 3;
      this.facing = 1;
    }
    else if(keyIsDown(LEFT_ARROW) && frameCount %3 == 0)
    {
  
      this.sx = (this.sx + 1) % 8;
      this.x -= 3;
      this.facing = -1;
    }
    else if(! (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)))
    {
      this.sx = 0;
    }

    pop();
  }

}