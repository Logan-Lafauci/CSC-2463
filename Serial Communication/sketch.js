//https://www.youtube.com/shorts/-1AuxcJW5Y8

let serialPDM;
let portName = "COM3";
let color;
let redVal = 0;
let greenVal = 0;
let blueVal = 0;

let sensor;

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor= serialPDM.sensorData;

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background([redVal, greenVal, blueVal]);

  if(color == "red"){
    redVal = sensor.a0;
  }
  else if(color == "green"){
    greenVal = sensor.a0;
  }
  else if(color == "blue"){
    blueVal = sensor.a0;
  }
}

function keyPressed() {
  if (key.toLowerCase() === 'r') {
    serialPDM.transmit('color', 1);
    color = "red";
  } else if (key.toLowerCase() === 'g') {
    serialPDM.transmit('color', 2);
    color = "green";
  } else if (key.toLowerCase() === 'b') {
    serialPDM.transmit('color', 3);
    color = "blue";
  }
}