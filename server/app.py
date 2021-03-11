from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
    if request.method == 'GET':  
        return 'Test Route'

@app.route('/translate', methods=['POST'])
def index():
    if request.method == 'POST':  
        f = request.files['file']  
        f.save(f.uri)  
        print(f.uri)
        return 'Image Uploaded Succesfully'

if __name__ == "__main__":
    app.run(debug=True)