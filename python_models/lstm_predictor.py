import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

def predict_lstm(prices):
    data = np.array(prices).reshape(-1, 1)
    X, y = [], []
    window = 5
    for i in range(len(data) - window):
        X.append(data[i:i+window])
        y.append(data[i+window])
    X, y = np.array(X), np.array(y)
    model = Sequential([
        LSTM(16, input_shape=(window, 1)),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=20, verbose=0)
    last_seq = data[-window:].reshape(1, window, 1)
    pred = model.predict(last_seq)
    return float(pred[0][0]) 