from openai import OpenAI

conversation_history = []

client = OpenAI()

while True:
    message = str(input("\n"))
    if(message == "quit" or message == ""):
        break
    else:
        completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": message}],
                max_tokens=250
            )
        response_content = completion.choices[0].message.content
        conversation_history.append({"role": "assistant", "content": response_content})
        print(response_content)



