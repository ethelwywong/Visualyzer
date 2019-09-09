# Visualyzer - Sound Analyzation and Visualization App
App that utilizes the p5.js JavaScript library and the YouTube Data API (v3) to analyze and visualize amplitude and frequency

## Table of Contents
1. [Features](#Features)
	* [Technologies](#Technologies)
2. [Illustration](#Illustration)
3. [Sources](#Sources)

## Features
* Search and view videos using the YouTube Data API (v3)
* Frequency and amplitude analysis of audio using the FFT analyzer from the p5.js library
	* Requires browser microphone access
* Split screen view of embedded YouTube player and rainbow visualizer
* Lowest frequencies (starting from 1 Hz) are depicted from 270° (or in the red-orange sector) and in a counter clockwise direction
* As of now, Visualyzer works only on Mozilla Firefox


**To Do:**
- [ ] Display and play through playlists
- [ ] Fix channel listing error

### Technologies
Project is created with:
- Node.js 10.16.3
- HTML 5
- CSS
- jQuery 3.4.1

## Illustration
![](https://github.com/ethelwywong/Visualyzer/blob/master/7jkgQ9KMsA.gif)
 
## Sources
This app is based on the [Microphone Input](https://www.youtube.com/watch?v=q2IDNkUws-A&t=344s) and [Sound Visualization](https://www.youtube.com/watch?v=2O3nm0Nvbi4) tutorials by The Coding Train, and the [YouTube App Tutorial](https://www.youtube.com/watch?v=9sWEecNUW-o&t=674s) by Richard Middleton.