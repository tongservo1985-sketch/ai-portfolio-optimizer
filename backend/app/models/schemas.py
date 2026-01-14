from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from uuid import UUID
from datetime import datetime

class AssetBase(BaseModel):
    id: UUID
    title: str
    file_path: str
    tags: Dict[str, List[str]] # e.g., {"style": ["minimalist"], "category": ["UI/UX"]}

class BriefAnalysisRequest(BaseModel):
    raw_text: str = Field(..., description="The job description or client message")
    user_id: UUID

class PortfolioCreateResponse(BaseModel):
    portfolio_id: UUID
    matching_score: float
    selected_asset_ids: List[UUID]
    dynamic_link: str

class PortfolioDetail(BaseModel):
    id: UUID
    client_name: Optional[str]
    assets: List[AssetBase]
    ai_explanation: str
    created_at: datetime