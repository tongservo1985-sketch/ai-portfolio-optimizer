# Computer Vision Pipeline: Automated Tagging

## Overview
This pipeline transforms a raw image upload into a structured, searchable data object. By using CLIP (Contrastive Language-Image Pre-training), we avoid the need for custom-trained models for every design trend. We simply update `src/vision/tags_definition.py` to add new design styles as they emerge.

## How it works
1. **Trigger:** The Ingestion API saves a file and pushes a message to Redis.
2. **Worker:** The Celery worker picks up the task.
3. **Inference:**
    - **CLIP Model:** Compares the image against the text labels in our Taxonomy.
    - **K-Means:** Analyzes the pixel distribution to find the 5 most dominant hex codes.
4. **Storage:** The resulting JSON is attached to the asset in the database, enabling the "Semantic Matching" phase (Phase 2 of the roadmap).

## Performance Note
- **GPU Acceleration:** The `DesignTaggingEngine` automatically detects CUDA. On a standard T4 GPU, processing takes ~200ms per image.
- **Scalability:** The worker is stateless and can be scaled horizontally via Kubernetes HPA.