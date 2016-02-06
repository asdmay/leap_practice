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
    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);

    if (!isRecording) {
	sketch.clear();
	points = [];
	sketch.setStrokeStyle(showColor);
	sketch.drawCircle(point.x, -point.y);

	return;
    }

    sketch.setStrokeStyle(drawColor);
    sketch.drawCircle(point.x, -point.y);

    points.push(point);
});

function getFingertip(finger){
    var point = {
	"x": finger.tipPosition[0],
	"y": finger.tipPosition[1],
	"z": finger.tipPosition[2]
    };
    return point;
}

function changeOfDistance(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(data[i+1].x - data[i].x, 2);
	var y = Math.pow(data[i+1].y - data[i].y, 2);
	var z = Math.pow(data[i+1].z - data[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}


function clear(data){
    var n = data.length;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push(0);
    }
    return d;
}

function setNormalizeArray(arrayX, arrayY, arrayZ){
    var arrayN = [];
    for (var i = 0; i < arrayX.length; i++) {
	arrayN.push({
	    x: arrayX[i],
	    y: arrayY[i],
	    z: arrayZ[i]
	});
    }
    return arrayN;
}

function normalize(value, min, max) {
    if(min == max){
	var d = 0.5;
    }else{
	d = (value - min) / (max - min);
    }
    return d;
};

// points を min から max で正規化
function spaceNormalize(points) {
    var d = points.map(function(d) { return [d.x, d.y, d.z]; });
    var ary = Array.prototype.concat.apply([], d);
    var min = Math.min.apply(null, ary);
    var max = Math.max.apply(null, ary);

    var npoints = [];
    for (var i = 0; i < points.length; i++) {
	var p = points[i];
	var np = {
	    x: normalize(p.x, min, max),
	    y: normalize(p.y, min, max),
	    z: normalize(p.z, min, max)
	};

	npoints.push(np);
    }

    return npoints;
}

function timeNormalize(array) {
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);

    var narray = [];
    for (var i = 0; i < array.length; i++) {
	if(min == max){
	    var nv = 0.5;
	}else{
	    nv = (array[i] - min) / (max - min);
	}
	narray.push(nv);
    }
    return narray;
};

function extractAxis(points, axis) {//各軸の座標を抜き出している
    return points.map(function(e) { return e[axis]; });
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];

    for (var i = 0; i < n; i++){
	var target = samples[i].points;

	var tdist = Distance.temporalDistance(tsQuery, target);
	var sdist = Distance.spatialDistance(tsQuery, target);

	var td = tdist;
	var sdX = sdist.x;
	var sdY = sdist.y;
	score.push({
	    name: samples[i].name,
	    score: sdX*sdY*td,
	    score_s: sdX*sdY,
	    score_t: td,
	    // parseInt(0.7*(sdX*sdY)+0.3*td)
	    points: samples[i].points
	});
    }
    score.sort(function(a,b){
    	if(a.score < b.score) return -1;
    	if(a.score > b.score) return 1;
    	return 0;
    });    
    // console.log(score);
    return score;
};

function distance(p1, p2) {
    var p = Math.pow(p1 - p2, 2);
    var d = Math.sqrt(p);
    return d;
};

function recordFinger(){
    if (isRecording) {
	console.log('end');
    } else {
	console.log('begin');
	$("#output").empty();
    }
    isRecording = !isRecording;
}

// 指定した canvas 要素に時系列データをアニメーションで描く
// id: 時系列データを表示したい canvas 要素の id
// points: 時系列データ ([{x: 1, y: 2, z: 3}, ... ] のような配列)
function drawTimeSeriesData(id, points) {
    var cs  = document.getElementById(id);
    var ctx = cs.getContext('2d');

    var w = cs.width;
    var h = cs.height;
    
    // processing の map 関数と同じやつ
    function mapValue(value, start1, stop1, start2, stop2) {
	var ratio = (value - start1) / (stop1 - start1);
	return start2 + ratio * (stop2 - start2);
    }

    // 時系列データ points の i 番目の点を表示するためのカウンタ
    var i = 0;

    function render() {
	var p = points[i];
	var x = mapValue(p.x, -256, 256, 0, w);
	var y = mapValue(p.y, 0, 550, h, 0);

	ctx.clearRect(0, 0, w, h);

	ctx.strokeStyle = drawColor;
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.PI*2, false);
	ctx.stroke();
	// console.log('draw point');
	// console.log(x);
	// console.log(y);

	i++;
	if (points.length <= i) {
	    i = 0;
	}
    }
    setInterval(render, 1000/60.0);
}

function searchData(){
    if(isRecording){
	isRecording = false;
	console.log('search start');
	result = searchTimeSeries(points);
	console.log(result);
	$.each(result, function(index, item){
	    var imgPath = './img/' + item.name + '.png';
	    var img = '<img src="' + imgPath + '">';
  
	    $("#output").append(
		$("<div/>").attr('class', 'view').append(img),
		$("<div/>").attr('class', 'result').
		    append('<p>'+item.name+'</p>').
		    append('<br/>').
		    append("total score").
		    append('<br/>').
		    append(item.score).
		    append('<br/>').
		    append("spatial score").
		    append('<br/>').
		    append(item.score_s).
		    append('<br/>').
		    append("temporal score").
		    append('<br/>').
		    append(item.score_t)
	    ).trigger('create');
	    $('.view').show(img);

	    // 動的にキャンバスを作成
	    var $canvas = $('<canvas>').attr({
		id: 'canvas-' + item.name,
		width: 160,
		height: 160
	    });
	    // 任意の位置にキャンバスを追加
//	    $("#output").append($canvas);
	    $("#output").append(
		$("<div/>").attr('class', 'move').append($canvas)
	    ).trigger('create');
	    // 指定した id のキャンバスに points を描く
	    drawTimeSeriesData('canvas-' + item.name, item.points);
	});
	console.log('search end');
	console.log(points);

    }else{
	console.log("nothing");
    }
}

$('#rec-button').click(recordFinger);
$('#search-button').click(searchData);
