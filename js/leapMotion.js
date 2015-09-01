var controller = new Leap.Controller({
    host: '127.0.0.1',
    port: 6437,
    enableGestures: true,
    frameEventName: 'animationFrame',
    useAllPlugins: true
});
controller.connect();


var point = (0, 0, 0);
var point2D = (0, 0);
var points = [];
var points2D = [];
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
	    console.log(points2D);
	}

	isDrawing = !isDrawing;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);
    point2D= getFingertip2D(finger);
    points.push(point);
    points2D.push(point2D);
});

function getFingertip(finger){
    var point = {x: finger.tipPosition[0],
		 y: finger.tipPosition[1],
		 z: finger.tipPosition[2]
		};
    return point;
}

function getFingertip2D(finger){
    var point2D = {x: finger.tipPosition[0],
		   y: finger.tipPosition[1]
		  };
    return point2D;
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

