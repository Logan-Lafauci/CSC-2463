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
  guy = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY));
  guy2 = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY));
  guy3 = new Charachter(guySpriteSheet, random(min, maxX), random(min, maxY));
  girl = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY));
  girl2 = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY));
  girl3 = new Charachter(girlSpriteSheet, random(min, maxX), random(min, maxY));
  van = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY));
  van2 = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY));
  van3 = new Charachter(vanSpriteSheet, random(min, maxX), random(min, maxY));
  yellow = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY));
  yellow2 = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY));
  yellow3 = new Charachter(yellowSpriteSheet, random(min, maxX), random(min, maxY));
  meat = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY));
  meat2 = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY));
  meat3 = new Charachter(meatSpriteSheet, random(min, maxX), random(min, maxY));
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
  
    //hold arrow keys to move and a release to reset animation
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