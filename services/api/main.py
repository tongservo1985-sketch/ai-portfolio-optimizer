from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from pydantic import BaseModel
import uuid
from tasks import process_media_asset

app = FastAPI(title="Overlord Media Ingestion API")

class UploadResponse(BaseModel):
    asset_id: str
    message: str

@app.post("/upload", response_model=UploadResponse)
async def upload_asset(file: UploadFile = File(...)):
    # 1. Generate unique ID
    asset_id = str(uuid.uuid4())
    file_extension = file.filename.split(".")[-1]
    storage_path = f"raw/{asset_id}.{file_extension}"
    
    # 2. Save file to storage (S3/Local)
    with open(f"./storage/{storage_path}", "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # 3. Create placeholder record in DB (Logic omitted for brevity)
    
    # 4. Trigger Asynchronous Processing
    process_media_asset.delay(asset_id, storage_path)
    
    return {
        "asset_id": asset_id,
        "message": "Upload successful. Processing started."
    }

@app.get("/health")
def health_check():
    return {"status": "online"}