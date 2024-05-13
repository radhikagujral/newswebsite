from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
import requests



app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return render_template('index.html')

URL = 'https://newsapi.org/v2/top-headlines?'
API_KEY = '4c00301fdaa242ee8d7290d50bc2ea36'


@app.route('/get_news', methods=['GET'])
def get_news():
    category = request.args.get('category')
    query_parameters = {
        "category": category,
        "country": "in",
        "apiKey": API_KEY
    }
    response = requests.get(URL, params=query_parameters)
    articles = response.json().get('article-container', [])
    results = [{"title": article["title"], "url": article["url"]} for article in articles]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
