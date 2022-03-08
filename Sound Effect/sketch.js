let rainGif;
let sunGif;
let weather = true;

//Synth for background music
let synth = new Tone.PolySynth().toDestination();
synth.set({ detune: -1200 });
synth.volume.value = -12;

//transition noise
let osc = new Tone.AMOscillator(400,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);
osc.volume.value = -10;

let freqLFO = new Tone.LFO(4,300,1000).start();
freqLFO.connect(osc.frequency); 


//rain sound effect
let rain = new Tone.Noise('pink').start();
let rainEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);
let rainFilter = new Tone.Filter(900, 'lowpass').connect(rainEnv);
rain.connect(rainFilter);
rain.volume.value = -20;

//wind sound effect
let wind = new Tone.Noise('pink').start();
let windEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);
let windFilter = new Tone.Filter(1000, 'bandpass').connect(windEnv);
wind.connect(windFilter);
wind.volume.value = -20;

function preload()
{
  rainGif = createImg('rain.gif');
  sunGif = createImg('sunny.gif');
}

function setup() {
  createCanvas(800, 900);
  textSize(20);
}

function draw() {
  background(255);
  text('Click mouse to change setting and music. Then wait and enjoy.', 125, 820);

  Tone.start();
  sunGif.position(0,0);
  rainGif.position(0,0);
  //sunny background and music
  if(weather)
  {
    rainGif.hide();
    rainEnv.triggerRelease();
    sunGif.show();
    windEnv.triggerAttack();
    if((frameCount % (60 * 8)) === 0)
    {
      synth.triggerAttackRelease(["C5", "E5", "A5"], 1.5);
      synth.triggerAttackRelease("C5", '4n', '+2');
      synth.triggerAttackRelease("E5", '4n', '+2.25');
      synth.triggerAttackRelease("G5", '4n', '+2.5');
      synth.triggerAttackRelease("G5", '4n', '+3');
      synth.triggerAttackRelease("E5", '4n', '+3.25');
      synth.triggerAttackRelease("C5", '4n', '+3.5');
      synth.triggerAttackRelease(["C5", "E5", "A5"], 1.5, '+4');
      synth.triggerAttackRelease("G5", '4n', '+6');
      synth.triggerAttackRelease("E5", '4n', '+6.25');
      synth.triggerAttackRelease("C5", '4n', '+6.5');
      synth.triggerAttackRelease("C5", '4n', '+7');
      synth.triggerAttackRelease("E5", '4n', '+7.25');
      synth.triggerAttackRelease("G5", '4n', '+7.5');
    }
  }
  else //rain background and music
  {
    sunGif.hide();
    windEnv.triggerRelease();
    rainGif.show();
    rainEnv.triggerAttack();
    if((frameCount % (60 * 11)) === 0)
    {
      synth.triggerAttackRelease(["C4", "E4", "A4"], 1.5);
      synth.triggerAttackRelease("G4", '2n', '+2');
      synth.triggerAttackRelease("E4", '2n', '+2.5');
      synth.triggerAttackRelease("C4", '2n', '+3');
      synth.triggerAttackRelease(["C4", "E4", "A4"], 1.5, '+5');
      synth.triggerAttackRelease("C4", '2n', '+7.5');
      synth.triggerAttackRelease("E4", '2n', '+8');
      synth.triggerAttackRelease("G4", '2n', '+8.5');
    }
  }
}

//changes scene between sunny and rainy
function mousePressed() {
  ampEnv.triggerAttackRelease('4n');

  weather = !weather;
  frameCount = 0;
}