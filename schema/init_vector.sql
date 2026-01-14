-- Enable the pgvector extension to work with AI embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table for High-Performance Semantic Search
CREATE TABLE IF NOT EXISTS asset_embeddings (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER REFERENCES media_assets(id),
    embedding vector(1536), -- Optimized for OpenAI text-embedding-3-small
    content_summary TEXT    -- AI generated description of the asset
);

-- Index for fast cosine similarity search
CREATE INDEX ON asset_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);