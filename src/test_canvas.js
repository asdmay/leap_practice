var $ = require('jquery');

var showColor = '#87ceeb';
var drawColor = '#000080';


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

	$.each(function(index, item){
	    var imgPath = './img/' + item.name + '.png';
	    var img = '<img src="' + imgPath + '">';
  
	    $("#output").append(
		$("<div/>").attr('class', 'view').append(img),
		$("<div/>").attr('class', 'result').
		    append('<p>'+item.name+'</p>').
		    append('<br/>').
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

    }else{
	console.log("nothing");
    }

$('#search-button').click(searchData);
