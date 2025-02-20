from fastapi import FastAPI
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FinanceData(BaseModel):
    incomes: list
    expenses: list

@app.post("/page")
def analyze_finance(data: FinanceData):
    response = openai.Completion.create(
        model="gpt-3.5-turbo",
        messages=[],
        max_tokens=150
    )


    return {}