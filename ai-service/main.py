from fastapi import FastAPI
from recommendation import generate_recommendations

app = FastAPI()

@app.post("/recommend")
async def recommend(data: dict):

    recommendations = generate_recommendations(
        data
    )

    return {
        "recommendations": recommendations
    }