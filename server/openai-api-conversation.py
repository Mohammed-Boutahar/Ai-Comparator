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
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Load tokens_used from .env file
tokens_used_str = os.getenv("tokens_used")
tokens_used = int(tokens_used_str) if tokens_used_str else 0

# Store conversation history
conversation_history = []

@app.route('/chat', methods=['POST'])
def chat():
    global conversation_history
    global tokens_used
    
    data = request.get_json()
    if data:
        message = data.get("message")
        if message:
            # Add user message to conversation history
            conversation_history.append({"role": "user", "content": message})
            # Initialize OpenAI client
            client = OpenAI()
            # Send conversation history to GPT model
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=conversation_history,
                max_tokens=150
            )
            # Extract the content from the response
            response_content = completion.choices[0].message.content
            # Add GPT model response to conversation history
            conversation_history.append({"role": "assistant", "content": response_content})
            # Get the total tokens used in the completion
            usage = completion.usage.total_tokens if completion.usage else 0
            # Update tokens_used
            tokens_used += usage
            # Write updated tokens_used to .env file
            with open("server/.env", "w") as f:
                f.write(f"tokens_used={tokens_used}\n")
            return jsonify({"response": response_content, "usage": usage, "total_tokens_used": tokens_used})
    return jsonify({"error": "Invalid request"}), 400

if __name__ == '__main__':
    app.run(debug=True)
