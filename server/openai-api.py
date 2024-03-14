import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment in case you have a different key then put it in the .env file
OPENAI_API_KEY1 = os.getenv("OPENAI_API_KEY1")
# print(OPENAI_API_KEY)
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if data:
        message = data.get("message")
        if message:
            client = OpenAI(api_key=OPENAI_API_KEY1)
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": message}],
                max_tokens=150
            )
            return jsonify({"response": completion.choices[0].message.content})
    return jsonify({"error": "Invalid request"}), 400

if __name__ == '__main__':
    app.run(debug=True)
