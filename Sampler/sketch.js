const sounds = new Tone.Players(
  {
    'snare': 'sample/snare.wav',
    'kick': 'sample/kick.wav',
    'hat': 'sample/hi-hat.wav',
    'clap': 'clap1.mp3'
  }
)
let button1;
let button2;
let button3;
let button4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sounds.toDestination();

  button1 = createButton('snare');
  button1.position(100, 100);
  button1.mousePressed(playSample('clap'));

  // button2 = createButton('kick');
  // button2.position(300, 100);
  // button2.mousePressed(playSample('kick'));

  // button3 = createButton('hi-hat');
  // button3.position(500, 100);
  // button3.mousePressed(playSample('hat'));

  // button4 = createButton('clap');
  // button4.position(700, 100);
  // button4.mousePressed(playSample('clap'));
}

function draw() {
  background(255);
}

function playSample(sound)
{
  sounds.player(sound).start();
}