var Sketch = function(id, enableMouseDrag) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');

    this.mousePressed = false;
    this.mouseX = 0;
    this.mouseY = 0;

    if (enableMouseDrag) {
	this.enableMouseDrag();
    }
};

Sketch.prototype.drawCircle =  function(x, y) {
    this.context.beginPath();
    this.context.strokeStyle = '#6DD900';
    this.context.arc(x, y, 12, 0, Math.PI*2, false);
    this.context.stroke();
};

Sketch.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


Sketch.prototype.enableMouseDrag = function() {
    //    var sketch = this;
    var sketch = new Sketch('sketch');
    var canvas = sketch.canvas;

    canvas.addEventListener('mousedown', function(e) {
    	sketch.clear();
	sketch.mousePressed = true;
    });

    canvas.addEventListener('mouseup', function(e) {
	sketch.mousePressed = false;
    });

    canvas.addEventListener('mousemove', function(e) {
	if (sketch.mousePressed) {
    	    var rect = e.target.getBoundingClientRect();
    	    sketch.mouseX = e.clientX - rect.left;
    	    sketch.mouseY = e.clientY - rect.top;
	    sketch.drawCircle(x, y);
//    	    sketch.drawCircle(sketch.mouseX, sketch.mouseY);
	}
    }, false);
};

module.exports = Sketch;