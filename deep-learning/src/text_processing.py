from sklearn.model_selection import train_test_split
from collections import Counter
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Split data into train test
def data_splitter(X, y):
    try:
        X_train, X_val, y_train, y_val = train_test_split(X,y, test_size=0.2, stratify=y, random_state=42)
        return (X_train, X_val, y_train, y_val)
    except Exception as e:
        print(e)
        raise 


# Standardize the text format
def clean_text(col):
    return col.fillna("").str.lower().str.replace(r"[^a-z0-9\s]", " ", regex=True).str.split()

# Build vocabulary
def build_vocab(col, max_words=20000):
    try:
        counter = Counter()
        for row in clean_text(col):
            counter.update(row)

        vocab = {"<pad>": 0, "<unk>": 1}
        for token, _ in counter.most_common(max_words):
            vocab[token] = len(vocab)

        return vocab

    except Exception as e:
        print(f"An error occurred.\n{e}")
        raise

# Convert text to numerical
def encode(col, vocab):
    try:
        transformed = []
        for row in clean_text(col):
            ids = [vocab.get(word, 1) for word in row]
            transformed.append(ids)

        return transformed

    except Exception as e:
        print(f"An error occurred.\n{e}")
        raise    

# Pad
def pad_id(id):
    try:
        X_id_pad = pad_sequences(id, maxlen=256, padding='post', truncating='post')
        return X_id_pad
    except Exception as e:
        print(e)
        raise