# from model import load_model
# from preprocess import preprocess_dataset
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
import shutil

app=FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

# load the saved model
model = load_model('model_weights')



