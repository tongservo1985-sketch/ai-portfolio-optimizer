-- Initializing the Design Taxonomy based on vision/tags_definition.py

INSERT INTO tag_categories (name) VALUES ('category'), ('style'), ('industry');

-- Seed Categories
INSERT INTO tags (category_id, tag_name) VALUES 
((SELECT id FROM tag_categories WHERE name='category'), 'UI/UX Design'),
((SELECT id FROM tag_categories WHERE name='category'), 'Branding'),
((SELECT id FROM tag_categories WHERE name='category'), 'Illustration'),
((SELECT id FROM tag_categories WHERE name='category'), 'Motion Graphics');

-- Seed Styles
INSERT INTO tags (category_id, tag_name) VALUES 
((SELECT id FROM tag_categories WHERE name='style'), 'Minimalist'),
((SELECT id FROM tag_categories WHERE name='style'), 'Brutalist'),
((SELECT id FROM tag_categories WHERE name='style'), 'Bauhaus'),
((SELECT id FROM tag_categories WHERE name='style'), 'Glassmorphism');

-- Seed Industries
INSERT INTO tags (category_id, tag_name) VALUES 
((SELECT id FROM tag_categories WHERE name='industry'), 'FinTech'),
((SELECT id FROM tag_categories WHERE name='industry'), 'Healthcare'),
((SELECT id FROM tag_categories WHERE name='industry'), 'E-commerce'),
((SELECT id FROM tag_categories WHERE name='industry'), 'Web3');