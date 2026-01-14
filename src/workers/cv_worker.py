import os
from celery import Celery
from src.vision.tagging_engine import DesignTaggingEngine
from src.vision.color_extractor import ColorExtractor

app = Celery('cv_tasks', broker=os.getenv('REDIS_URL', 'redis://localhost:6379/0'))

# Initialize engines outside the task to leverage container warming
tagger = DesignTaggingEngine()
color_extractor = ColorExtractor(cluster_count=5)

@app.task(name="pipeline.process_design_asset")
def process_design_asset(asset_id, file_path):
    """
    Asynchronous task to process uploaded design assets.
    1. Extracts style/category tags.
    2. Extracts color palette.
    3. Updates the database (mocked logic).
    """
    print(f"[*] Processing Asset {asset_id} at {file_path}")
    
    try:
        # 1. Semantic Tagging
        tags = tagger.analyze_asset(file_path)
        
        # 2. Color Analysis
        palette = color_extractor.get_palette(file_path)
        
        # 3. Construct Metadata Object
        metadata = {
            "asset_id": asset_id,
            "ai_tags": tags,
            "palette": palette,
            "status": "PROCESSED"
        }
        
        # In a real scenario, we would perform a database update here:
        # db.assets.update_one({"id": asset_id}, {"$set": {"metadata": metadata}})
        
        return metadata

    except Exception as e:
        print(f"[!] Error processing asset: {str(e)}")
        return {"asset_id": asset_id, "status": "FAILED", "error": str(e)}