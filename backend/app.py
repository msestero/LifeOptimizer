from flask import Flask, request, jsonify
import subprocess
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/basic_investment/', methods=['GET'])
def basic_investment():
    # Capture query parameters
    initial_investment = request.args.get('initial_investment', default="0", type=str)
    monthly = request.args.get('monthly', default="0", type=str)
    yearly = request.args.get('yearly', default="0", type=str)
    growth = request.args.get('growth', default="0.08", type=str)  # Default growth rate of 8%
    years_of_growth = request.args.get('years_of_growth', default="1", type=str)  # Default to 1 year for simplicity

    # Prepare the command to call the script with arguments
    command = [
        "./basic_investment.py", 
        initial_investment, 
        "--monthly", monthly, 
        "--yearly", yearly, 
        "--growth", growth, 
        "--years_of_growth", years_of_growth
    ]

    # Call the script and capture its output
    result = subprocess.run(command, capture_output=True, text=True)
    
    # Check for errors in script execution
    if result.returncode != 0:
        return jsonify({"error": "Error executing the investment calculation", "details": result.stderr}), 500

    # Convert the string output to a Python list
    try:
        monthly_results = json.loads(result.stdout)
    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse the script output", "details": result.stdout}), 500

    # Return the result as a JSON object
    return jsonify({"monthly_results": monthly_results})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
