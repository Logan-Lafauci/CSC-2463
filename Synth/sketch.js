const synth = new Tone.AMSynth().toDestination();
const reverb = new Tone.JCReverb(0).toDestination();

//all letter keys make a sound
let notes = {
  'q': 'G2',
  'w': 'A2',
  'e': 'B2',
  'r': 'C3',
  't': 'D3',
  'y': 'E3',
  'u': 'F3',
  'i': 'G3',
  'o': 'A3',
  'p': 'B3',
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5',
  'l': 'D5',
  'z': 'E5',
  'x': 'F5',
  'c': 'G5',
  'v': 'A5',
  'b': 'B5',
  'n': 'C6',
  'm': 'D6'
}

//setting up dials and the base value
let reverbDial;
reverb.roomSize.value = 0;
let volumeDial;
synth.volume.value = -15;
let harmDial;
synth.harmonicity.value = 1;

synth.connect(reverb);

function preload(){
  reverbDial = Nexus.Add.Dial('#dial',{
    'size': [100,100],
    'min' : 0,
    'max' : .95
  });

  volumeDial = Nexus.Add.Dial('#dial2',{
    'size': [100,100],
    'min' : -30,
    'max' : 0,
    'value' : -15
  });

  harmDial = Nexus.Add.Dial('#dial3', {
    'size': [100,100],
    'min' : 1,
    'max' : 10,
    'value' : 1
  })
}

function setup() {
  createCanvas(200, 200);

  reverbDial.on('change', (v)=>{
    reverb.roomSize.value = v;
  });

  volumeDial.on('change', (v)=>{
    synth.volume.value = v;
  });

  harmDial.on('change', (v)=>{
    synth.harmonicity.value = v;
  });

  textSize(20);
}

function draw() {
  background(255);
  text('Press any letter keys', 10, 50);
}

function keyPressed() {
  console.log(key);
  let toPlay = notes[key.toLowerCase()];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.25);
}