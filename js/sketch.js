function sketchProc(processing) {
    processing.setup = function(){
	processing.size(600, 600, processing.P3D);
	processing.fill(255);
	processing.stroke(255);
    };

    processing.draw = function() {
	processing.background(0);

	if(!isDrawing){
	    processing.fill(30);
	    processing.stroke(30);
	}else{
	    processing.fill(255);
	    processing.stroke(255);
	}

	drawPoint(point);
    };

    function drawPoint(point){
	processing.pushMatrix();
	processing.translate(point.x, point.y, point.z);
	processing.sphere(12);
	processing.popMatrix();
    }
}

var canvas = document.getElementById("sketch");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
