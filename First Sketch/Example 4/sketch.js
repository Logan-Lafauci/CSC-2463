function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0, 0, 175);
  noStroke();
  fill(255);
  circle(300, 300, 350);
  fill(0, 175, 0);
  circle(300, 300, 335);
  fill(255);
  star(300, 300, 375);
  fill(255, 0, 0);
  star(300, 300, 325);
}

function star(x, y, size){
  beginShape();
  vertex(x, y - size/2);
  vertex(x + size/3.2, y + size/2.6);
  vertex(x - size/2.2, y - size/5);
  vertex(x + size/2.2, y - size/5);
  vertex(x - size/3.2, y + size/2.6);
  vertex(x, y - size/2);
  endShape();
}