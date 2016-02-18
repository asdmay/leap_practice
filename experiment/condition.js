var LinearInterpolation = require('../src/LinearInterpolation.js');
var Preprocess = require('../src/preprocess.js');
var DTW = require('../src/dtw.js');
var Distance = require('../src/distance.js');

var Condition = {};

// baseline
// cos類似度による手法
Condition.baseline = function(ts1, ts2) {
    // linear interpolation
    // ts1 と ts2 では時系列データの要素数が異なる
    // そのため、点数ベースの線形補間を行い、要素数を揃える
    // (これにより、時間軸は無視される)
    
    // normalize

    // co-sine similarity
    // ts1` と ts2` をそれぞれベクトルとし、cos 類似度を求める

    return 0;
};

// baseline
// DTW による手法
Condition.dtw = function(ts1, ts2) {
    function distance3D(p1, p2) {
	var x = Math.pow(p1.x - p2.x, 2);
	var y = Math.pow(p1.y - p2.y, 2);
	var z = Math.pow(p1.z - p2.z, 2);
	return Math.sqrt(x + y + z);
    }

    // normalize
    var ts1_n = Preprocess.spatialNormalize(ts1);
    var ts2_n = Preprocess.spatialNormalize(ts2);

    // dtw
    var score = DTW.distance(ts1_n, ts2_n, distance3D, 30);

    return score;
};


// approach2
// DTW (temporal and spatial features) による手法
Condition.dtw_ts = function(ts1, ts2) {
    var tdist = Distance.temporalDistance(ts1, ts2);
    var sdist = Distance.spatialDistance(ts1, ts2);

    var score = tdist * sdist.x * sdist.y;
    return score;
};

module.exports = Condition;
