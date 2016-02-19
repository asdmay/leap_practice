var Condition = require('./condition.js');

// subjects
var fs = require('fs');
var filename = process.argv[2];
var subjects = JSON.parse(fs.readFileSync(filename, 'utf8'));

// test data
var targets = require('../src/test/data.json');


// experiment
var result = [];
for (var s_i = 0; s_i < subjects.length; s_i++) {
    var subject = subjects[s_i];
    var ts1 = subject.points;

    for (var t_i = 0; t_i < targets.length; t_i++) {
	var target = targets[t_i];
	var ts2 = target.points;

	// similarity measure methods
	var dtw = Condition.dtw;	// baseline
	var dtw_ts = Condition.dtw_ts;  // approach

	var baselineScore = dtw(ts1, ts2);
	var approachScore = dtw_ts(ts1, ts2);


	result.push({
	    subject: subject.name,
	    target:  target.name,
	    baseline: baselineScore,
	    approach: approachScore
	});
    }
}


// output result
console.log('subject,target,baseline,approach');
result.forEach(function(e, i, ary) {
    // output result
    console.log(e.subject + ',' + e.target + ',' + e.baseline + ',' + e.approach);
});


// for sorting
function resultCompare(a, b) {
    return a.score - b.score;
}
