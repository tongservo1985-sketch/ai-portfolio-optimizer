# Documentation: Client Brief & Matching Logic Workflow

## Process Overview
1. **Brief Ingestion:** The freelancer pastes a job description (from Upwork, LinkedIn, or Email) into the OVERLORD dashboard.
2. **AI Dissection:** The `client_brief_analyzer` (LLM) extracts key semantic metadata and weights based on the user's input.
3. **Vector + Tag Filtering:**
    - The system performs a hybrid search.
    - It queries the database for assets matching the `Primary Category`.
    - It uses semantic embeddings to find assets that match the `Visual Style` and `Industry`.
4. **Scoring:** The `PortfolioMatchingEngine` (Python) calculates a final relevance score for the top 10 candidates.
5. **Pitch Generation:** The `portfolio_pitch_agent` generates custom "Why this matters" text for the top 3-5 selected pieces to be included in the dynamic portfolio link.

## Key Logic: The "Lenses"
The matching engine utilizes the `DESIGN_TAXONOMY` defined in the Vision Pipeline. If an asset was tagged as "Minimalist" by the CV worker, and the brief analyzer detects a requirement for "Clean, uncluttered UI," the matching engine creates a high-confidence link.

## Future Scaling
- **Feedback Loop:** If a designer removes a suggested project, the system penalizes that specific tag-to-brief-keyword relationship for future matching.
- **Conversion Tracking:** Projects that lead to successful hires will be boosted in future recommendations for similar briefs.