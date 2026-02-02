from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import os
from helpers.db import Db

import helpers.clients as clients

app = FastAPI()
db = Db()

@app.middleware("http")
async def check_token(request: Request, next):
    tokenId = request.headers.get("token-id")
    if not tokenId:       
        return JSONResponse(
            status_code=401,
            content={"detail": "Missing 'token-id' in headers"}
        )    
    
    if tokenId != os.environ.get("API_TOKEN_ID"):       
        return JSONResponse(
            status_code=403,
            content={"detail": "Invalid 'token-id'"}
        )  
           
    return await next(request)

    
""" Clients """ 

@app.get("/clients")
async def searchClient(request: Request):  
    return clients.search(db, page=int(request.query_params.get("page", 1)), pageSize=int(request.query_params.get("pageSize", 100))) 

@app.get("/clients/{id}")
async def getClient(id: int):
    return clients.get(db, id) 

@app.put("/clients")
async def createClient(request: Request):
    data = await request.json()
    return clients.create(db, data)   

@app.patch("/clients/{id}")
async def updateClient(id: int, request: Request):
    data = await request.json()
    return clients.update(db, id, data)  