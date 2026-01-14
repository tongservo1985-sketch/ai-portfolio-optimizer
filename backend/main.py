from fastapi import FastAPI
from backend.app.api.v1.endpoints import portfolios

app = FastAPI(
    title="OVERLORD API",
    description="Dynamic Portfolio Generation Service for AI Freelance Assistant",
    version="1.0.0"
)

# Include Routers
app.include_router(portfolios.router, prefix="/api/v1/portfolios", tags=["Portfolios"])

@app.get("/")
async def health_check():
    return {"status": "active", "service": "Overlord Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)