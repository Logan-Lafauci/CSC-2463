function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0, 145, 145);
  line(0, 0, 500, 400);
  line(500, 0, 0, 400);
  stroke(255, 0, 0);
  fill(255, 255, 255, 100);
  rect(225, 300, 50, 100, 20, 20, 0, 0);
  fill(255, 0, 0);
  beginShape();
  vertex(100, 135);
  vertex(135, 100);
  vertex(100, 0);
  endShape();
}