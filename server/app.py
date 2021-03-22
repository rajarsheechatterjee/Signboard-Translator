from flask import Flask, request, jsonify
from google.cloud import vision

import numpy as np
import urllib.request
import cv2
import pytesseract
import cv2

from flask_cors import CORS

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ""}})

@app.route('/', methods=['GET'])
def test():
    if request.method == 'GET':  
        return jsonify({"text": 'Test Route'})

@app.route('/translate', methods=['GET'])
def index():
    if request.method == 'GET':  
        imageUri = request.args.get('imageUri')

        # def url_to_image(url):
        # 	resp = urllib.request.urlopen(url)
        # 	image = np.asarray(bytearray(resp.read()), dtype="uint8")
        # 	image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        # 	return image
        
    #     image = url_to_image(imageUri)

    #     # Image Preprocessing
    #     img = cv2.resize(image, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)
    #     img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #     kernel = np.ones((1, 1), np.uint8)    
    #     img = cv2.dilate(img, kernel, iterations=1)    
    #     img = cv2.erode(img, kernel, iterations=1)
    #     cv2.threshold(cv2.GaussianBlur(img, (9, 9), 0), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    #     text = pytesseract.image_to_string(img, lang = 'eng')

    return jsonify({"imageUri": imageUri})
    # return 'Success'

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")