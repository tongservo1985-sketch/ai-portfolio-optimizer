import cv2
import numpy as np
from sklearn.cluster import KMeans
from PIL import Image

class ColorExtractor:
    """Extracts dominant color palette from design assets."""
    
    def __init__(self, cluster_count=5):
        self.cluster_count = cluster_count

    def get_palette(self, image_path):
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Resize to speed up processing
        image = cv2.resize(image, (200, 200), interpolation=cv2.INTER_AREA)
        pixels = image.reshape(-1, 3)

        kmeans = KMeans(n_clusters=self.cluster_count, n_init=10)
        kmeans.fit(pixels)
        
        colors = kmeans.cluster_centers_.astype(int)
        
        # Convert to Hex for frontend use
        hex_colors = [
            '#{:02x}{:02x}{:02x}'.format(c[0], c[1], c[2]) 
            for c in colors
        ]
        return hex_colors