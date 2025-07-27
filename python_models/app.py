from flask import Flask, request, jsonify
from arima_predictor import predict_arima
from lstm_predictor import predict_lstm

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Python prediction microservice is running!", 200

@app.route('/predict/arima', methods=['POST'])
def arima():
    data = request.json.get('prices', [])
    if not data or len(data) < 5:
        return jsonify({'error': 'Not enough data'}), 400
    prediction = predict_arima(data)
    return jsonify({'prediction': prediction})

@app.route('/predict/lstm', methods=['POST'])
def lstm():
    data = request.json.get('prices', [])
    if not data or len(data) < 10:
        return jsonify({'error': 'Not enough data'}), 400
    prediction = predict_lstm(data)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 