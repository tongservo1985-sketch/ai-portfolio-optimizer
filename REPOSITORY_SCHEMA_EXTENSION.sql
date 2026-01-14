-- Database schema extensions to support the Customization Workflow

CREATE TABLE custom_portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    designer_id UUID REFERENCES profiles(id),
    client_name VARCHAR(255),
    job_description_raw TEXT,
    ai_generated_pitch TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    is_password_protected BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE custom_portfolio_assets (
    portfolio_id UUID REFERENCES custom_portfolios(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id),
    sort_order INT,
    ai_match_score FLOAT,
    ai_match_reason TEXT,
    PRIMARY KEY (portfolio_id, asset_id)
);

CREATE TABLE portfolio_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES custom_portfolios(id),
    viewer_ip_hash TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration_seconds INT,
    assets_clicked JSONB -- Stores which asset IDs were interacted with
);