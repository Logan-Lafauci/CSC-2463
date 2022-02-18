//loading samples
let sounds = new Tone.Players(
  {
    'snare': 'sample/snare.wav',
    'kick': 'sample/kick.wav',
    'hat': 'sample/hi-hat.wav',
    'clap': 'sample/clap.wav'
  }
);

//UI
let button1;
let button2;
let button3;
let button4;
let slider;

//sound effects
var delay = new Tone.FeedbackDelay("8n", 0.5);
var gain = new Tone.Gain().toDestination();
sounds.connect(delay);
delay.connect(gain);
sounds.connect(gain);

function setup() {
  createCanvas(windowWidth, windowHeight);
  sounds.toDestination();
  

  button1 = createButton('snare');
  button1.position(10, 5);
  button1.size(width/2-15, height/ 2-20);
  button1.style('font-size', '48px');
  button1.mousePressed(() => playSample('snare'));

  button2 = createButton('kick');
  button2.position(width/2 +5, 5);
  button2.size(width/2 - 15, height/ 2 - 20);
  button2.style('font-size', '48px');
  button2.mousePressed(() => playSample('kick'));

  button3 = createButton('hi-hat');
  button3.position(10, height/ 2 - 5);
  button3.size(width/2 - 15, height/ 2 - 20);
  button3.style('font-size', '48px');
  button3.mousePressed(() => playSample('hat'));

  button4 = createButton('clap');
  button4.position(width/2 +5, height/ 2 - 5);
  button4.size(width/2 - 15, height/ 2 - 20);
  button4.style('font-size', '48px');
  button4.mousePressed(() => playSample('clap'));

  // slider = new Nexus.Slider('#slider');
  // slider.on('change', function (v){
  //   delay.delayTime.value = v;
  // })

  slider = createSlider(0,1,0,0.01);
  slider.position(10, height -20);
  slider.style('width', '500px');
  slider.mouseReleased(()=>{
    let delayTime = slider.value();
    delay.delayTime.rampTo(delayTime, 1);
  });

  textSize(20);
}

function draw() {
  background(10, 225, 245);
  text('Delay', 525, height-5);
}

function playSample(sound)
{
  sounds.player(sound).start();
}