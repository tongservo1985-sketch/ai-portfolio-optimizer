import openai
from typing import List

class PortfolioMatcher:
    """
    Core Intelligence: Matches client needs to freelancer portfolio items
    and generates a professional, personalized pitch.
    """
    
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)

    def analyze_client_brief(self, brief: str):
        # Extract keywords and intent from client job description
        response = self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "Extract core design requirements and industry focus from this brief."},
                {"role": "user", "content": brief}
            ]
        )
        return response.choices[0].message.content

    def generate_personalized_pitch(self, freelancer_name: str, client_name: str, projects: List[dict], brief: str):
        # Create a narrative connecting the freelancer's work to the client's problem
        prompt = f"""
        Freelancer: {freelancer_name}
        Client: {client_name}
        Client Brief: {brief}
        Selected Works: {projects}
        
        Write a high-converting, professional proposal that explains why these specific 
        portfolio items prove I can solve the client's problem. Keep it concise and elite.
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

# Example usage
# matcher = PortfolioMatcher(api_key="sk-...")
# pitch = matcher.generate_personalized_pitch("Jane Doe", "TechCorp", [...], "Need a brand refresh for a fintech app")