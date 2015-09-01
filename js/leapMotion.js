var Point = function(x, y, z) {
    this.x = x ? x : 0.0;
    this.y = y ? y : 0.0;
    this.z = z ? z : 0.0;
};

var point = new Point(0, 0, 0);
var points = [];
var isDrawing = false;

Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }

    if(keyTapped(frame)){
	console.log("key tapped!!!");

	if(!isDrawing){
	    console.log("start gesture");
	    points = [];
	}else{
	    console.log("end gesture");
	    console.log(points);
	}

	isDrawing = !isDrawing;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);

    points.push(point);
});

function getFingertip(finger){
    var point = new Point(
	finger.tipPosition[0],
	finger.tipPosition[1],
	finger.tipPosition[2]
    );
    return point;
}

function keyTapped(frame){
    var gestures = frame.gestures;
    for (var i = 0; i < gestures.length; i++){
	if(gestures[i].type == "keyTap"){
	    return true;
	}
    }
    return false;
}
