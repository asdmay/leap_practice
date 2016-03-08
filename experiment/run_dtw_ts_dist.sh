#!/bin/bash

subjects_dir=../../ashidaResearch/experiment/subjects
output_dir=./result

# exp
for i in `seq -w 20`;
do
    subject=${subjects_dir}/experiment${i}.json
    result=${output_dir}/experiment${i}_approach_score.csv

    echo "${subject} -> experiment -> ${result}"

    node dtw_ts_dist.js ${subject} > ${result}
done
