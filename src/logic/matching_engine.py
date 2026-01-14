import numpy as np
from typing import List, Dict

class PortfolioMatchingEngine:
    """
    Logic to calculate the relevance score between a parsed Client Brief 
    and the tagged assets in the Designer's Repository.
    """

    def __init__(self, semantic_threshold: float = 0.7):
        self.threshold = semantic_threshold

    def calculate_relevance_score(self, asset_tags: Dict, brief_criteria: Dict, weights: Dict) -> float:
        """
        Calculates a weighted score (0.0 - 1.0) for a specific portfolio piece.
        """
        score = 0.0
        
        # 1. Category Match (Hard Constraint / High Weight)
        if asset_tags.get('category') == brief_criteria.get('category'):
            score += 0.4 * weights.get('technical_skill_importance', 1.0)
        
        # 2. Style Match (Semantic similarity between lists)
        asset_styles = set(asset_tags.get('styles', []))
        brief_styles = set(brief_criteria.get('styles', []))
        style_overlap = len(asset_styles.intersection(brief_styles))
        if brief_styles:
            style_score = style_overlap / len(brief_styles)
            score += (style_score * 0.3 * weights.get('style_importance', 1.0))

        # 3. Industry Match
        if asset_tags.get('industry') == brief_criteria.get('industry'):
            score += 0.3 * weights.get('industry_experience_importance', 1.0)
            
        return round(min(score, 1.0), 2)

    def rank_portfolio(self, repository_assets: List[Dict], analyzed_brief: Dict) -> List[Dict]:
        """
        Ranks all assets in the repository based on the analyzed brief.
        """
        ranked_results = []
        criteria = analyzed_brief['match_criteria']
        weights = analyzed_brief['weighted_priorities']

        for asset in repository_assets:
            relevance = self.calculate_relevance_score(asset['tags'], criteria, weights)
            if relevance >= self.threshold:
                asset_copy = asset.copy()
                asset_copy['relevance_score'] = relevance
                ranked_results.append(asset_copy)

        # Sort by highest relevance
        return sorted(ranked_results, key=lambda x: x['relevance_score'], reverse=True)

# Example Usage
# engine = PortfolioMatchingEngine()
# top_picks = engine.rank_portfolio(user_vault, parsed_json_from_ai)