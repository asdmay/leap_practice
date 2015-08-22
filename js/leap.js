var isDrawing = false;
var points = [];

Leap.loop({enableGestures: true}, function(frame){
    if (frame.hands.length <= 0) {
	return;
    }

    if (keyTapped(frame)) {
	console.log("keyTapped!");

	if (!isDrawing) { // start gesture
	    console.log("start gesture");
	    points = [];
	} else {          // end gesture
	    console.log("end gesture");

	    // 
	}

	isDrawing = !isDrawing;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);
    points.push(point);
});

function getFingertip(finger) {
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]};
    return point;
}

function keyTapped(frame) {
    var gestures = frame.gestures;
    for (var i = 0; i < gestures.length; i++) {
	if (gestures[i].type == "keyTap") {
	    return true;
	}
    }
    return false;
}
