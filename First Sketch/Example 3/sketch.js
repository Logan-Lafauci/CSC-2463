function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0, 0, 0);
  noStroke();
  fill(255, 255, 0);
  circle(200, 200, 350);
  fill(0);
  triangle(200, 200, 25, 25, 25, 375);
  fill(230, 0, 0);
  square(425, 30, 350, 200, 200, 0, 0);
  fill(255);
  circle(510, 200, 110);
  circle(690, 200, 110);
  fill(0, 0, 255);
  circle(510, 200, 60);
  circle(690, 200, 60);
}