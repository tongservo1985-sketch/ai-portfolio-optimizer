# Data Dictionary - Project OVERLORD

## Table: assets
The core repository of a designer's work.
- `ai_status`: Tracks the lifecycle of the Computer Vision pipeline (pending -> processing -> completed).
- `visual_style`: A JSONB blob storing the results of the CLIP analysis (e.g., `{"minimalist": 0.92, "brutalist": 0.05}`).
- `embedding`: A vector representation of the asset for high-speed semantic similarity searches against client briefs.

## Table: client_briefs
Stores the input from the job description parser.
- `raw_job_description`: The original text pasted by the designer.
- `parsed_style_requirements`: Extracted visual preferences (e.g., "dark mode", "high-end", "fintech").

## Table: portfolios
The final output sent to the client.
- `custom_slug`: A human-readable URL identifier (e.g., `overlord.ai/p/jdoe-fintech-project`).
- `intro_copy`: AI-generated text that explains to the client *why* this specific selection of work is relevant to their brief.

## Table: portfolio_assets
The logic layer connecting assets to portfolios.
- `match_score`: How well this specific asset matches the `client_brief` requirements.
- `ai_reasoning`: A short snippet explaining the link (e.g., "Selected because of the blue color palette matching your brand guidelines").