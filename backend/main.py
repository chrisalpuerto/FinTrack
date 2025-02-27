from fastapi import FastAPI
from pydantic import BaseModel
import openai
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
    goals: str

@app.post("/analyze-spending")
def analyze_spending(data: FinanceData):
    prompt = f"""
    Analyze the following financial data, and provide insights on how the user can be finacially better and achieve their financial goals. If they are doing well already, state that. Do not use bold letters:
    **Income:**
    {data.incomes}
    **Expenses:**
    {data.expenses}
    **Financial Goals:**
    {data.goals}
    """

    chat_completions = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a financial assistant. Help the user with their financial goals by providing insights based on their income and expenses. Keep your response fit the {max_tokens} token limit. No bold letters as well, do not have '**' in your responses. Inputs will be for monthly data."},
                  {"role": "user", "content": prompt}],
        max_tokens=500
    )


    return {"analysis": chat_completions.choices[0].message.content}