import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from application.components import predict, read_imagefile
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

@app.post("/predict/image")
async def predict_api(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    image = read_imagefile(await file.read())
    prediction = predict(image)

    return prediction

@app.get("/categories")
async def get_categories():
    resp = {}
    resp["categories"] = settings.categories
    return resp


if __name__ == "__main__":
    uvicorn.run(app, debug=True)
