#!/bin/bash

subjects_dir=../../ashidaResearch/experiment/subjects
output_dir=./result

# exp
for i in `seq -w 20`;
do
    subject=${subjects_dir}/experiment${i}.json
    result=${output_dir}/experiment${i}_result.csv

    echo "${subject} -> experiment -> ${result}"

    node ec_exp.js ${subject} > ${result}
done


# rank
for i in `seq -w 20`;
do
    ./test/rank.py ./result/experiment${i}_result.csv;
done
