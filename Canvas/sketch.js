let c = 'Red';

function setup() {
  createCanvas(1000, 1000);
  background(235);
}

function draw() {
  currentColor();
  stroke(0);
  strokeWeight(1);

  //Different color selection
  fill('Red');
  rect(5, 5, 20, 20);
  fill('Orange');
  rect(5, 26, 20, 20);
  fill('Yellow');
  rect(5, 47, 20, 20);
  fill('LawnGreen');
  rect(5, 68, 20, 20);
  fill('Cyan');
  rect(5, 89, 20, 20);
  fill('Blue');
  rect(5, 110, 20, 20);
  fill('Magenta');
  rect(5, 131, 20, 20);
  fill('SaddleBrown');
  rect(5, 152, 20, 20);
  fill(255);
  rect(5, 173, 20, 20);
  fill(0);
  rect(5, 194, 20, 20);
  
  //drawing
  if(mouseIsPressed && (mouseX > 25 || mouseY > 215))
  {
    stroke(c);
    smooth();
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

//switches the color you draw with
function currentColor()
{
  if(mouseIsPressed && mouseX > 5 && mouseX < 25)
    {
      if(mouseY > 5 && mouseY < 25)
        c = 'Red';
      if(mouseY > 26 && mouseY < 46)
        c = 'Orange';
      if(mouseY > 47 && mouseY < 67)
        c = 'Yellow';
      if(mouseY > 68 && mouseY < 88)
        c = 'LawnGreen';
      if(mouseY > 89 && mouseY < 109)
        c = 'Cyan';
      if(mouseY > 110 && mouseY < 130)
        c = 'Blue';
      if(mouseY > 131 && mouseY < 151)
        c = 'Magenta';
      if(mouseY > 152 && mouseY < 172)
        c = 'SaddleBrown';
      if(mouseY > 173 && mouseY < 193)
        c = 255;
      if(mouseY > 194 && mouseY < 214)
        c = 0;
    }
}