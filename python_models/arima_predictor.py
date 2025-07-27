from statsmodels.tsa.arima.model import ARIMA

def predict_arima(prices):
    try:
        model = ARIMA(prices, order=(2,1,2))
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=1)
        return float(forecast[0])
    except Exception as e:
        print(f'ARIMA error: {e}')
        return None 