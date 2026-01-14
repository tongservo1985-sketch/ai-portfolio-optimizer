-- Database Schema for Project OVERLORD
-- Target: PostgreSQL 15+
-- Description: Core schema for managing freelance assets, AI-generated metadata, 
-- client briefs, and dynamically generated bespoke portfolios.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER MANAGEMENT
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    profile_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ASSET REPOSITORY (The "Vault")
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL, -- S3 Path
    thumbnail_path TEXT,
    mime_type VARCHAR(100),
    file_size_bytes BIGINT,
    original_filename VARCHAR(255),
    -- AI Vision Metadata
    ai_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    primary_category VARCHAR(100), -- From DESIGN_TAXONOMY
    visual_style JSONB,            -- List of styles with confidence scores
    color_palette JSONB,           -- Hex codes and dominance
    detected_objects JSONB,        -- UI elements, icons, etc.
    embedding vector(1536),        -- For pgvector semantic search (OpenAI CLIP/Ada)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TAGGING SYSTEM (Master Taxonomy)
CREATE TABLE tag_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- 'industry', 'style', 'tool', 'platform'
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES tag_categories(id),
    tag_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE asset_tags (
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    confidence_score FLOAT DEFAULT 1.0,
    is_manual_override BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (asset_id, tag_id)
);

-- 4. CLIENT & JOB CONTEXT
CREATE TABLE client_briefs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    raw_job_description TEXT,
    client_name VARCHAR(255),
    -- Parsed AI Data
    parsed_industry VARCHAR(100),
    parsed_style_requirements JSONB,
    parsed_deliverables TEXT[],
    extracted_keywords TEXT[],
    urgency_level VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BESPOKE PORTFOLIOS (The Generated Opportunity)
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_brief_id UUID REFERENCES client_briefs(id) ON DELETE SET NULL,
    custom_slug VARCHAR(255) UNIQUE NOT NULL, -- For the public link
    title VARCHAR(255),
    intro_copy TEXT, -- AI-generated personalized message to the client
    is_public BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PORTFOLIO-ASSET JUNCTION (The Selection)
CREATE TABLE portfolio_assets (
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL,
    match_score FLOAT, -- AI matching confidence for this specific brief
    ai_reasoning TEXT, -- Why this piece was selected for this client
    PRIMARY KEY (portfolio_id, asset_id)
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_portfolios_slug ON portfolios(custom_slug);
CREATE INDEX idx_asset_tags_tag_id ON asset_tags(tag_id);
CREATE INDEX idx_client_briefs_user_id ON client_briefs(user_id);