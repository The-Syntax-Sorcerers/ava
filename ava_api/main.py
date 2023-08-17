# from model import load_model
# from preprocess import preprocess_dataset
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
import shutil

app=FastAPI()

@app.get("/")
def root(text:str):
    return {"message": "Hello World"}

# load the saved model
# model = load_model('model_weights')

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    return {"filenames": file.filename}

# @app.post("/uploads")
# async def uploads(file: List[UploadFile] = File(...)):
#     return {"filenames": file.filename}


