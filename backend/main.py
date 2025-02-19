from fastapi import FastAPI
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
class FinanceData(BaseModel):
    incomes: list
    expenses: list

@app.post("/analyze")
def analyze_finance(data: FinanceData):
    return {}