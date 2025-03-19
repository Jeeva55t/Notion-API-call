from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/emails', methods=['GET'])
def get_emails():
    try:
        with open('emails.json', 'r') as file:
            emails = json.load(file)
        return jsonify(emails)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
