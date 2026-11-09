import pandas as pd

def data_loader(path):
    try:
        df = pd.read_csv(path)
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"No file at {path}") 