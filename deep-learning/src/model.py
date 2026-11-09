from tensorflow.keras.models import Sequential
from tensorflow.keras import layers, Model, Input
from tensorflow.keras.layers import Embedding,Dense
from tensorflow.keras.callbacks import EarlyStopping

# Model (RNN, LSTM)
def train_model(vocab, model_name, X_train_pad, y_train, X_val, y_val):
    try:
        early_stop = EarlyStopping(monitor='val_loss', patience=2, restore_best_weights=True)

        model = Sequential([
            Embedding(len(vocab), 8, mask_zero=True),
            model_name(16),
            Dense(1, activation='sigmoid')
        ])

        model.compile(
            optimizer = 'adam',
            loss = 'binary_crossentropy',
            metrics = ['accuracy']
        )

        history = model.fit(
            X_train_pad, y_train,
            epochs = 5,
            batch_size = 32,
            validation_data = (X_val, y_val),
            callbacks = [early_stop]
        )

        return (model, history)

    except Exception as e:
        print(e)
        raise     


# Model (TRANSFORMER)
def build_transformer(vocab, X_train_pad, y_train, X_val, y_val):
    try:

        early_stop = EarlyStopping(monitor='val_loss', patience=2, restore_best_weights=True)

        inputs = Input(shape=(256,))
        x = layers.Embedding(len(vocab), 8, mask_zero=True)(inputs)
        attn = layers.MultiHeadAttention(num_heads=2, key_dim=8)(x, x)
        x = layers.LayerNormalization()(x + attn)
        x = layers.GlobalAveragePooling1D()(x)
        outputs = layers.Dense(1, activation='sigmoid')(x)

        model = Model(inputs, outputs)

        model.compile(
            optimizer = 'adam',
            loss = 'binary_crossentropy',
            metrics = ['accuracy']
        )

        history = model.fit(
            X_train_pad, y_train,
            epochs = 5,
            batch_size = 32,
            validation_data = (X_val, y_val),
            callbacks = [early_stop]
        )

        return (model, history)

    except Exception as e:
        print(e)
        raise    
