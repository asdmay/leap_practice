var Distance = require('../src/distance.js');

// test data
var samples = require('../src/test/data.json');

// subject's query
var query = samples[0];
var ts1 = query.points;

// calculate similarity
var result = [];
for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    var score = Distance.tsDist(ts1, ts2);

    result.push({
	ts1_name: query.name,
	ts2_name: samples[i].name,
	score: score
    });
}

// sort
result.sort(function(a, b) {
    return a.score - b.score;
});

// output
console.log("ts1_name,ts2_name,score");
result.forEach(function(element, index, array) {
    console.log(element.ts1_name + ',' + element.ts2_name + ',' + element.score);
});

