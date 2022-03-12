from xmlrpc.client import Boolean
from application.components.prediction.serve_model import load_model
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
import os
import numpy as np
import uuid

from application.components import predict, read_imagefile, load_model
from application.components.prediction import settings

app_desc = """"""
app = FastAPI(title='Sketch Classification API', description=app_desc)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def save_image(image, prediction):
    dir = os.getenv('WOT_SAVE_PATH')
    folder = settings.categories[np.argmax(prediction["confidence"])]
    image_dir = os.path.join(dir,folder)
    if not(os.path.isdir(image_dir)):
        os.mkdir(image_dir)
    image.save(f"{image_dir}/{str(uuid.uuid1())}.png", format = "PNG")


@app.post("/predict/image")
async def predict_api(file: UploadFile = File(...), save_image_flag: Boolean = False):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    image = read_imagefile(await file.read())
    prediction = predict(image)
    if os.getenv('WOT_SAVE_PATH') != None and save_image_flag == True:
        print(os.getenv('WOT_SAVE_PATH'))
        save_image(image, prediction)

    return prediction

@app.get("/categories")
async def get_categories():
    resp = {}
    resp["categories"] = settings.categories
    return resp


if __name__ == "__main__":
    load_model()
    uvicorn.run(app, debug=True)
    


