import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
from src.vision.tags_definition import DESIGN_TAXONOMY

class DesignTaggingEngine:
    def __init__(self, model_name="openai/clip-vit-base-patch32"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained(model_name).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_name)

    def analyze_asset(self, image_path):
        image = Image.open(image_path).convert("RGB")
        results = {}

        for group, candidates in DESIGN_TAXONOMY.items():
            # We use CLIP's zero-shot capability to match images to text labels
            inputs = self.processor(
                text=[f"A {c} style" for c in candidates], 
                images=image, 
                return_tensors="pt", 
                padding=True
            ).to(self.device)

            outputs = self.model(**inputs)
            logits_per_image = outputs.logits_per_image 
            probs = logits_per_image.softmax(dim=1)
            
            # Get the top matching tag
            top_idx = probs.argmax().item()
            results[group] = {
                "label": candidates[top_idx],
                "confidence": round(probs[0][top_idx].item(), 4)
            }

        return results