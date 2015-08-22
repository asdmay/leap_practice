function sketchProc(processing) {
    var count;

    processing.setup = function(){
	processing.size(480, 480, processing.P3D);

	processing.fill(processing.color(255, 0, 255));
	processing.stroke(processing.color(255, 0, 0));

	count = 0;
    };

    processing.draw = function() {
	drawPoint(points[count++]);

	if (points.length <= count) {
	    count = 0;

	    processing.background(0);
	}
    };


    function drawPoint(point) {
	processing.pushMatrix();

	processing.translate(point.x, -point.y, point.z);
	processing.sphere(12);

	processing.popMatrix();
    }
}

var canvas = document.getElementById("sketch");
var p = new Processing(canvas, sketchProc);
