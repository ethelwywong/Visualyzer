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

function preload()
{
	BUTTONWIDTH = 100;
	BUTTONHEIGHT = 30;
	BUTTONRADIUS = 8;

	PROGRESSBARWIDTH = 250;
	PROGRESSBARHEIGHT = 5;

	songArray = ['Does_She.mp3', 'dwyg.mp3'];
	loadedSongs = [];
	for (var i = 0; i < songArray.length; i++)
	{
		song = loadSound(songArray[i]);
		loadedSongs.push(song);
	}

	console.log('loaded');
}

function setup()
{
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	colorMode(HSB);

	songIndex = 0;
	song = loadedSongs[songIndex];
	//song.play();
	fft = new p5.FFT(0.9,128); // first number is for smoothing
	textSize(20);
  	textAlign(CENTER, CENTER);
  	colorChange = 0;
  	forward = true;
  	lock = false;
  	begin = true;
  	percentCompleted = 0;

  	//create invisible buttons behind the changing color ones
  	//left most
	backButton = createButton('');
	backButton.position(width/3-35, 7*height/8);
	backButton.class('button');
	backButton.size(BUTTONWIDTH,BUTTONHEIGHT);
	backButton.mousePressed(backSong);
	
	// middle
	playButton = createButton('');
	playButton.position(width/2-50, 7*height/8);
	playButton.class('button');
	playButton.size(BUTTONWIDTH,BUTTONHEIGHT);
	playButton.mousePressed(toggleSong);
	
	// right most
	skipButton = createButton('');
	skipButton.position(2*width/3-65, 7*height/8);
	skipButton.class('button');
	skipButton.size(BUTTONWIDTH,BUTTONHEIGHT);
	skipButton.mousePressed(skipSong);
}

// clean-up
function draw()
{
	background(0); // make background black?
	translate(width/2, height/2); // translate (0,0) to center of canvas

	checkNextSong();
	// EXPLANATION
	timePoint = song.duration() - song.currentTime();

	if(!song.isPlaying())
	{
		lock = true;
	}
	if (!lock)
	{
		countdown = secondsToTime(timePoint);
	}
	
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
	
	// middle countdown timer
	countDown();
	
	textSize(15);
	translate(-width/2,-height/2);
	noFill();

	createProgressBar();
	updateProgress();

	//back button
	updateBackButton();

	// play button
	updateToggleButton();

	// skip button
	updateSkipButton();

	// for changing color of buttons
	changeColor();
}

function createProgressBar()
{
	// background color
	noStroke();
	fill(43,43,43);
	rect(width/2 - PROGRESSBARWIDTH/2, 5*height/6, PROGRESSBARWIDTH, PROGRESSBARHEIGHT, BUTTONRADIUS);
}

function updateProgress()
{
	// calculate how much of the song has been completed
	// create a color changing bar based on percentage completed
	fill(colorChange, 255, 255);
	let newWidth;

	if(lock || begin)
	{
		newWidth = PROGRESSBARWIDTH*(percentCompleted);
		rect(width/2 - PROGRESSBARWIDTH/2, 5*height/6, newWidth, PROGRESSBARHEIGHT, BUTTONRADIUS);
	}
	else if(!lock)
	{
		newWidth = PROGRESSBARWIDTH*(percentCompleted);
		rect(width/2 - PROGRESSBARWIDTH/2, 5*height/6, newWidth, PROGRESSBARHEIGHT, BUTTONRADIUS);

		percentCompleted = song.currentTime()/song.duration();
	}
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	backButton.position(width/3-35, 7*height/8);
  	playButton.position(width/2-50, 7*height/8);
  	skipButton.position(2*width/3-65, 7*height/8);
  	fastForwardButton.position(2*width/3-65, 3*height/4);
  	rewindButton.position(width/3-35, 3*height/4);

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

function backSong()
{
	if (songIndex > 0)
	{
		song.stop();
		songIndex --;
		song = loadedSongs[songIndex];
		lock = true;
		//song.play();
	}
}

function toggleSong()
{
	if (song.isPlaying())
	{
		song.pause();
		//playButton.html('play');
		lock = true;
	}
	else
	{
		song.play();
		//playButton.html('pause');
		lock = false;
		begin = false
	}
}

function skipSong()
{
	if (songIndex != loadedSongs.length - 1)
	{
		song.stop();
		songIndex ++;
		song = loadedSongs[songIndex];
		//song.play();
	}
}

function checkNextSong()
{
	if (!song.isPlaying() && lock == false && songIndex != loadedSongs.length - 1 && !begin) // song has ended, not paused and not the first song
	{
		songIndex ++;
		song = loadedSongs[songIndex];
		song.play();
	}
}

function countDown()
{
	noStroke();
	fill(0,0,0);
	ellipse(0,0,100,100);
	noStroke();
	fill(colorChange,255,255); // 0,0,255 is white?
	text(countdown, 0,0);
}

function updateBackButton()
{
	strokeWeight(1);
	stroke(colorChange,255,255);
	text('BACK', width/3+15, 7*height/8 + 17); // -224, 327
	noFill();
	stroke(colorChange,255,255);
	rect(width/3-35, 7*height/8, BUTTONWIDTH,BUTTONHEIGHT, BUTTONRADIUS); // -275, 310
}

function updateToggleButton()
{
	strokeWeight(1);
	stroke(colorChange,255,255);
	if(song.isPlaying())
	{
		text('PAUSE', width/2, 7*height/8 + 17);
	}
	else
	{
		text('PLAY', width/2, 7*height/8 + 17);
	}
	noFill();
	stroke(colorChange,255,255);
	rect(width/2-50, 7*height/8, BUTTONWIDTH,BUTTONHEIGHT, BUTTONRADIUS); // -50, 310
}

function updateSkipButton()
{
	strokeWeight(1);
	stroke(colorChange,255,255);
	text('SKIP', 2*width/3-15, 7*height/8 +17);
	noFill();
	stroke(colorChange,255,255);
	rect(2*width/3-65, 7*height/8,BUTTONWIDTH,BUTTONHEIGHT, BUTTONRADIUS); // 175, 310
}

function secondsToTime(secs)
{
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    // fix formatting so single digits have 0 in front
    if (hours < 10)
    {
    	hours = hours.toString();
    	hours = '0'+hours;
    	parseInt(hours);
    }
    if (minutes < 10)
    {
    	minutes = minutes.toString();
    	minutes = '0'+minutes;
    	parseInt(minutes);
    }
    if (seconds < 10)
    {
    	seconds = seconds.toString();
    	seconds = '0'+seconds;
    	parseInt(seconds);
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}
