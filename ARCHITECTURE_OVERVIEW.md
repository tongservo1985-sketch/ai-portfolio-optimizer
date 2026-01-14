# Scalable Media Processing Layer Architecture

## 1. Components
- **Ingestion API:** FastAPI-based service handling multipart uploads and generating Signed URLs for S3.
- **Object Storage:** AWS S3 or Google Cloud Storage (Bucket structure: `/raw`, `/processed`, `/thumbnails`).
- **Message Broker:** Redis / RabbitMQ for task orchestration.
- **Worker Cluster (Celery/Python):** 
    - **Optimization Worker:** Resizing, format conversion (WebP/AVIF), stripping EXIF.
    - **Vision Worker:** AI Tagging (Style detection, Color palette, Object detection).
    - **Embedding Worker:** Generating vector representations for semantic search.
- **Metadata Store:** PostgreSQL (Relational) + pgvector (Vector search).

## 2. Data Flow
1. User uploads file via Frontend.
2. Ingestion API saves to `s3://bucket/raw/` and creates a DB record with status `PENDING`.
3. An event is published to the Message Broker.
4. **Optimization Worker** picks it up, generates optimized versions, saves to `s3://bucket/processed/`.
5. **Vision Worker** analyzes the image, generates tags and industry categories.
6. DB record is updated to `READY`, and a WebSocket notification is sent to the designer.