from flask import Flask, jsonify, request
from db import create_tables

app = Flask(__name__)

@app.route('/hello')
def hello():
    return {'hello': ['hello world']}

if __name__ == "__main__":
    create_tables()
    app.run(debug=True)
