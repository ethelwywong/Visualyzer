var songIndex;
var song;
var fft;
var loadedSongs;
var begin;

var BUTTONWIDTH;
var BUTTONHEIGHT;
var BUTTONRADIUS;

var PROGRESSBARWIDTH;
var PROGRESSBARHEIGHT;

var playButton;
var skipButton;
var backButton;
var testButton;

var timePoint;
var percentCompleted;
let countdown;
let lock;

let colorChange;
let forward;

// be able to play multiple songs - eventually link to youtube? itunes??
// eventually list song name and artist? have to get info from somewhere - sliding text
// test if song can just be a youtube video playing
// have a menu for different settings: og, cat eyes flashing 
// fix the positioning of the actual buttons

function setup()
{
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	colorMode(HSB);

	mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  	mic.start();
	//song.play();
	fft = new p5.FFT(0.9,128); // first number is for smoothing
	fft.setInput(mic);
	textSize(20);
  	textAlign(CENTER, CENTER);
  	colorChange = 0;
}

// clean-up
function draw()
{
	background(6.5); // make background black?
	translate(3*width/4, height/2-50); // translate (0,0) to center of canvas
	
	var spectrum = fft.analyze();
	noStroke();

	// for the visualizer 
	for (var i = 0; i < spectrum.length; i ++)
	{
		var angle = map(i, 0, spectrum.length, 0,360) + 90;
		var amp = spectrum[i];
		var r = map(amp, 0 , 512, 80 , 400);
		//fill(i*5,255,255);
		var x = r * cos(angle);
		var y = r * sin(angle);
		strokeWeight(2);
		stroke(i*3, 255, 255);

		line(0,0,x,y);
	}
	endShape();
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function changeColor()
{
	if (colorChange >= 255)
	{
		forward = false;
	}
	else if(colorChange <= 0)
	{
		forward = true;
	}

	if (forward)
	{
		colorChange ++;
	}
	else
	{
		colorChange --;
	}
}