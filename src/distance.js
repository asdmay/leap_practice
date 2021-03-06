var LinearInterpolation = require('./LinearInterpolation.js');
var Preprocess = require('./preprocess.js');
var DTW = require('./dtw.js');

var Distance = {};

// 1次元の点同士のユークリッド距離を求める関数
// 1次元の場合のユークリッド距離は差の絶対値に等しい
function distance1D(p1, p2) {
    var d = Math.abs(p1 - p2);
    return d;
};


// 時間的類似度を求めるための前処理
function temporalPreprocess(ts) {
    // change of distance
    var ts_cod = Preprocess.changeOfDistance(ts);

    // normalize
    var ts_cod_n = Preprocess.temporalNormalize(ts_cod);

    return ts_cod_n;
}

// 時間的類似度を求める関数
Distance.temporalDistance = function(ts1, ts2) {
    var ts1_p = temporalPreprocess(ts1);
    var ts2_p = temporalPreprocess(ts2);

    // dtw
    var d =  DTW.distance(ts1_p, ts2_p, distance1D, 30);
    return d;
};


// 空間的類似度を求めるための前処理
function spatialPreprocess(ts) {
    // linear interpolation
    var ts_li = LinearInterpolation.compute(ts);
    
    // normalize
    var ts_li_n = Preprocess.spatialNormalize(ts_li);

    // get x-axis
    var ts_x = ts_li_n.map(function(e) { return e.x; });

    // get y-axis
    var ts_y = ts_li_n.map(function(e) { return e.y; });

    return {"x": ts_x, "y": ts_y};
}

// 空間的類似度を求める関数
Distance.spatialDistance = function(ts1, ts2) {
    var ts1_p = spatialPreprocess(ts1);
    var ts2_p = spatialPreprocess(ts2);

    // dtw x-axis
    var xdist = DTW.distance(ts1_p.x, ts2_p.x, distance1D, 30);

    // dtw y-axis
    var ydist = DTW.distance(ts1_p.y, ts2_p.y, distance1D, 30);
    
    return {"x": xdist, "y": ydist};
};

module.exports = Distance;
