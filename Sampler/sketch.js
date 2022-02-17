let sounds = new Tone.Players(
  {
    'snare': 'sample/snare.wav',
    'kick': 'sample/kick.wav',
    'hat': 'sample/hi-hat.wav',
    'clap': 'sample/clap.wav'
  }
);
let button1;
let button2;
let button3;
let button4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sounds.toDestination();
  

  button1 = createButton('snare');
  button1.position(10, 10);
  button1.size(width/2-15, height/ 2-20);
  button1.style('font-size', '48px');
  button1.mousePressed(() => playSample('snare'));

  button2 = createButton('kick');
  button2.position(width/2 +5, 10);
  button2.size(width/2 - 15, height/ 2 - 20);
  button2.style('font-size', '48px');
  button2.mousePressed(() => playSample('kick'));

  button3 = createButton('hi-hat');
  button3.position(10, height/ 2);
  button3.size(width/2 - 15, height/ 2 - 20);
  button3.style('font-size', '48px');
  button3.mousePressed(() => playSample('hat'));

  button4 = createButton('clap');
  button4.position(width/2 +5, height/ 2);
  button4.size(width/2 - 15, height/ 2 - 20);
  button4.style('font-size', '48px');
  button4.mousePressed(() => playSample('clap'));
}

function draw() {
  background(10, 225, 245);
}

function playSample(sound)
{
  sounds.player(sound).start();
}