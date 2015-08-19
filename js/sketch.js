// initialize leapmotion
var controller = new Leap.Controller({
    host: '127.0.0.1',
    port: 6437,
    enableGestures: true,
    frameEventName: 'animationFrame',
    useAllPlugins: true
});
controller.connect();


var points = [];
var isDrawing = false;

function sketchProc(processing) {
    processing.setup = function(){
	processing.size(600, 600, processing.P3D);
	processing.background(0);
	processing.fill(processing.color(255, 0, 255));
	processing.stroke(processing.color(255, 0, 0));

    };


    processing.draw = function() {
	var frame = controller.frame();
	
	if(frame.hands.length == 0) {
	    return;
	}

	frame.gestures.forEach(function(gesture){
	    if (gesture.type == "keyTap") {
		if (!isDrawing) { // start point
		    points = [];
		} else {          // end point
		    console.log(points);

		    // output
		    var o = document.getElementById("output");
		    o.innerHTML = JSON.stringify(points);
		}

	    	isDrawing = !isDrawing;
	    	console.log("key tapped!!!");
	    }
	});

	if (!isDrawing) {
	    processing.background(0);
	}

	var hand = frame.hands[0];
	var index = hand.indexFinger;
	var x = index.tipPosition[0];
	var y = index.tipPosition[1];
	var z = index.tipPosition[2];
	var point = {"x": x, "y": y, "z": z};
	points.push(point);

	processing.pushMatrix();

	processing.translate(processing.width/2, processing.height, 0);
	processing.translate(x, -y, z);

	processing.sphere(12);
	processing.popMatrix();
    };
}


var canvas = document.getElementById("sketch");
var p = new Processing(canvas, sketchProc);
