import json
from typing import List, Dict
from sqlalchemy.orm import Session
from ..models import schemas # Assuming SQLAlchemy models are defined based on init.sql

class PortfolioGenerator:
    """
    Core Logic: Matches Client Briefs against the Asset Vault using 
    Semantic Tag Matching and AI Reasoning.
    """
    
    def __init__(self, db: Session, openai_client):
        self.db = db
        self.ai = openai_client

    async def analyze_brief(self, raw_text: str) -> Dict:
        """Uses the Client Brief Analysis Agent prompt to extract requirements."""
        # This implementation calls OpenAI using the prompt defined in the requirements
        response = await self.ai.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are the Lead Creative Strategist for Project OVERLORD..."},
                {"role": "user", "content": f"Analyze this brief: {raw_text}"}
            ],
            response_format={ "type": "json_object" }
        )
        return json.loads(response.choices[0].message.content)

    def calculate_match_score(self, asset_tags: Dict, brief_requirements: Dict) -> float:
        """
        Heuristic matching algorithm:
        Compares Asset Tags (from Computer Vision) vs Brief Requirements (from LLM).
        """
        score = 0.0
        # Category Match (Weighted 50%)
        if any(cat in asset_tags.get('category', []) for cat in brief_requirements.get('categories', [])):
            score += 0.5
        
        # Style Match (Weighted 30%)
        matching_styles = set(asset_tags.get('style', [])) & set(brief_requirements.get('styles', []))
        if matching_styles:
            score += 0.3 * (len(matching_styles) / max(len(brief_requirements.get('styles', [])), 1))
            
        # Industry Match (Weighted 20%)
        if brief_requirements.get('industry') in asset_tags.get('industry', []):
            score += 0.2
            
        return score

    async def generate_bespoke_portfolio(self, user_id: str, brief_text: str):
        # 1. Parse Brief
        requirements = await self.analyze_brief(brief_text)
        
        # 2. Fetch User Assets (Ideally indexed by vector or tags)
        # For MVP, we fetch and filter in-memory; for Production, use pgvector/Elasticsearch
        assets = self.db.execute("SELECT id, tags, file_path FROM assets WHERE user_id = :uid", {"uid": user_id}).fetchall()
        
        scored_assets = []
        for asset in assets:
            score = self.calculate_match_score(asset.tags, requirements)
            if score > 0.3: # Threshold
                scored_assets.append((score, asset))
        
        # 3. Sort by score and pick top 5
        scored_assets.sort(key=lambda x: x[0], reverse=True)
        top_assets = scored_assets[:5]
        
        # 4. Generate AI 'Why this matches' explanation
        explanation_prompt = f"Explain why these {len(top_assets)} projects are perfect for a client looking for: {brief_text}"
        # ... call AI to get explanation ...

        return {
            "assets": [a[1].id for a in top_assets],
            "score": sum([a[0] for a in top_assets]) / len(top_assets) if top_assets else 0,
            "explanation": "These projects demonstrate your expertise in Minimalist FinTech UI..."
        }