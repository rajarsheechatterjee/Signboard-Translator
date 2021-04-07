from flask import Flask, request, jsonify
from langdetect import detect
import numpy as np
import cv2
import easyocr
import urllib.request
import matplotlib.pyplot as plt
import requests
import unicodedata
import json

app = Flask(__name__)

def urlToImage(url):
	resp = urllib.request.urlopen(url)
	image = np.asarray(bytearray(resp.read()), dtype="uint8")
	image = cv2.imdecode(image, cv2.COLOR_BGR2RGB)
	return image

def convertToRGB(img):
    rgbImage = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return rgbImage

def denoising(img):
    dst = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 15) 
    return dst

def convertToGrayscale(img):
    greyImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return greyImage

def adaptiveGaussianThresholding(img):
    thresh = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    return thresh

def thinningAndSkeletonization(img):
    kernel = np.ones((5,5),np.uint8)
    erosion = cv2.erode(img,kernel,iterations = 1)
    return erosion

def translate(text,tl):

    URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+tl+'&dt=t&q=' + text
    r = requests.get(url=URL)
    data = r.json()
    
    return data[0][0][0]

@app.route('/translate', methods=['GET'])
def index():

    if request.method == 'GET':

        url = request.args.get('imageUri')
        tl = request.args.get('tl')

        image = urlToImage(url)

        rgbImage = convertToRGB(image)

        denoisedImage = denoising(rgbImage)

        greyscaleImage = convertToGrayscale(denoisedImage)

        binarisedImage = adaptiveGaussianThresholding(greyscaleImage)

        # erodedImage = thinningAndSkeletonization(binarisedImage)

        reader = easyocr.Reader(['hi','en'], gpu=True)

        originalText = reader.readtext(binarisedImage, detail=0)

        originalText = ' '.join(originalText)

        originalTextCode = detect(originalText)

        translatedText = translate(originalText,tl)

    return ({'originalText': originalText, 'originalTextCode': originalTextCode, 'translatedText': translatedText, 'translatedTextCode': tl  })

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")