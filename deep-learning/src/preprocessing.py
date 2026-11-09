import numpy as np


def make_binary(df):
    try:
        df = df[df['label']!=2].copy()
        df['label'] = np.where(df['label']>=3,1,0)
        return df.reset_index(drop=True)
    except Exception as e:
        print(e)
        raise