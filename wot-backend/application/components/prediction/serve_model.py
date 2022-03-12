from io import BytesIO
import os
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.imagenet_utils import decode_predictions
import tensorflow as tf
from . import  settings

model = None


def load_model():

    model = tf.keras.models.load_model('/code/application/model/model.h5')

    print("Model loaded")
    return model


def predict(image: Image.Image):
    
    if model is None:
        model = load_model()

    image = np.asarray(image.resize((224, 224)))[..., :3]
    image = np.expand_dims(image, 0)
    image = image / 255

    result = model.predict(image)
    result = result[settings.order]
    predicted_probs = result.tolist()
    labels = settings.categories
    predicted_class = labels[np.argmax(result)]
   
    resp = {}
    resp["class"] = predicted_class
    resp["class_confidence"] = np.max(result).item()
    resp["confidence"] = predicted_probs[0]
    
    return resp


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image
