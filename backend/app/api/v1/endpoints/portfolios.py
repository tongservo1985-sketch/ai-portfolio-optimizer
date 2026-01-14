from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ....app.services.matching_service import PortfolioGenerator
from ....app.models import schemas
from ....app.core.database import get_db
import uuid

router = APIRouter()

@router.post("/generate", response_model=schemas.PortfolioCreateResponse)
async def create_dynamic_portfolio(
    request: schemas.BriefAnalysisRequest, 
    db: Session = Depends(get_db)
):
    """
    Endpoint to trigger the AI Matching engine and create a 
    bespoke portfolio link.
    """
    generator = PortfolioGenerator(db)
    
    # Run the matching logic
    result = await generator.generate_bespoke_portfolio(
        user_id=request.user_id, 
        brief_text=request.raw_text
    )
    
    if not result["assets"]:
        raise HTTPException(status_code=404, detail="No relevant assets found in your vault for this brief.")

    # Save portfolio to DB
    new_portfolio_id = uuid.uuid4()
    # SQL: INSERT INTO portfolios (id, user_id, assets_list, ai_explanation) VALUES (...)
    
    return {
        "portfolio_id": new_portfolio_id,
        "matching_score": result["score"],
        "selected_asset_ids": result["assets"],
        "dynamic_link": f"https://overlord.ai/p/{new_portfolio_id}"
    }

@router.get("/{portfolio_id}", response_model=schemas.PortfolioDetail)
async def get_portfolio(portfolio_id: uuid.UUID, db: Session = Depends(get_db)):
    """
    Retrieves the customized portfolio for the client view.
    """
    # SQL: JOIN portfolios and assets
    # Fetch data...
    pass