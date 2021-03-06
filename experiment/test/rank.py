#!/usr/bin/env python
import sys

import pandas as pd
import numpy as np


if __name__ == '__main__':
    filename = sys.argv[1]

    df = pd.read_csv(filename)

    def top(df, n=5, column='baseline'):
        return df.sort_values(by=column).head(n)

    def findIndex(df, column):
        df = df.sort_values(by=column)
        i = 1
        for index, row in df.iterrows():
            if row['match']:
                return i
            i += 1

        return -1

    key = ['subject_name', 'subject_pattern']

    # df.groupby(key, group_keys=False).agg(top, n=5, column='baseline')
    # df.groupby(key, group_keys=False).agg(top, n=5, column='approach')

    result = df.groupby(key, group_keys=False).agg(findIndex, column='baseline')
    result.to_csv(filename + '.baseline_rank.csv')
    print(result)

    result = df.groupby(key, group_keys=False).agg(findIndex, column='approach')
    result.to_csv(filename + '.approach_rank.csv')
    print(result)
