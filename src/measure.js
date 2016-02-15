var $ = require('jquery');
var Leap = require('leapjs');

var Distance = require('./distance.js');
var Sketch = require('./sketch.js');

var showColor = '#87ceeb';
var drawColor = '#000080';

var sketch = new Sketch('sketch');
// var samples = require('./samples.json');
var samples = require('./test/data.json');
var points = [];
var isRecording = false;
var result = [];

Leap.loop({enableGestures: true}, function(frame){
    function getFingertip(finger){
	var point = {
	    "x": finger.tipPosition[0],
	    "y": finger.tipPosition[1],
	    "z": finger.tipPosition[2]
	};
	return point;
    }

    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);

    if (isRecording) {
	sketch.setStrokeStyle(drawColor);
	points.push(point);
    } else {
	sketch.clear();
	sketch.setStrokeStyle(showColor);
    }

    sketch.drawCircle(point.x, -point.y);
});
