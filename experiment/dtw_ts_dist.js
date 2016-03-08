function splitSubjectName(dataName) {
    var ary = dataName.split('-');
    var name = ary[0];
    var pattern = ary.slice(1).join('-');

    return {name: name, pattern: pattern};
}

function formatPatternName(patternName) {
    var ary = patternName.split('-');
    var generalForm = ary[0];
    var detail = ary[1];

    return generalForm + "(" + detail + ")";
}


var Preprocess = require('../src/preprocess.js');
var Distance = require('../src/distance.js');

var dtw_ts = function(ts1, ts2) {
    ts1 = Preprocess.ignoreZAxis(ts1);
    ts2 = Preprocess.ignoreZAxis(ts2);

    var tdist = Distance.temporalDistance(ts1, ts2);
    var sdist = Distance.spatialDistance(ts1, ts2);

    return {
	tdist: tdist,
	sxdist: sdist.x,
	sydist: sdist.y
    };
};


// subjects
var fs = require('fs');
var filename = process.argv[2];
var subjects = JSON.parse(fs.readFileSync(filename, 'utf8'));

// test data
var targets = require('../src/test/data.json');


// experiment
var Condition = require('./condition.js');
var result = [];
for (var s_i = 0; s_i < subjects.length; s_i++) {
    var subject = subjects[s_i];
    var ts1 = subject.points;

    for (var t_i = 0; t_i < targets.length; t_i++) {
	var target = targets[t_i];
	var ts2 = target.points;

	var score = dtw_ts(ts1, ts2);


	result.push({
	    subject: subject.name,
	    target:  target.name,
	    tdist: score.tdist,
	    sxdist: score.sxdist,
	    sydist: score.sydist
	});
    }
}


// output result
console.log('subject_name,subject_pattern,target_pattern,tdist,sxdist,sydist');
result.forEach(function(e, i, ary) {
    var s = splitSubjectName(e.subject);
    s.pattern = formatPatternName(s.pattern);

    // output result
    console.log(s.name + ',' + s.pattern + ',' + e.target + ',' + e.tdist + ',' + e.sxdist + ',' + e.sydist);
});
