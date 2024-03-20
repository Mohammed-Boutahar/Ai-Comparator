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
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# print(OPENAI_API_KEY)
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if data:
        message = data.get("message")
        if message:
            client = OpenAI(api_key=OPENAI_API_KEY)
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": message}],
                max_tokens=150
            )
            # Convert completion.choices[0].message.content and completion.usage to strings
            response_content = str(completion.choices[0].message.content)
            usage = completion.usage.total_tokens if completion.usage else ""   
            return jsonify({"response": response_content, "usage": usage})
    return jsonify({"error": "Invalid request"}), 400

if __name__ == '__main__':
    app.run(debug=True)
