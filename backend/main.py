from fastapi import FastAPI, status
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

class UserBase(BaseModel):
    username: str

class FinanceData(BaseModel):
    incomes: list
    expenses: list
    goals: str
    incomeMonthly: str

@app.post("/users/")
def fake_create_user(user: UserBase):
    return {"message": f"User {user.username} received (not stored)"}

@app.post("/analyze-spending")
def analyze_spending(data: FinanceData):
    prompt = f"""
    Analyze the following financial data, and provide insights on how the user can be financially better and achieve their financial goals. If they are doing well already, state that. Do not use bold letters or any '**' characters in your response:
    Income: {data.incomes}
    Expenses: {data.expenses}
    Financial Goals: {data.goals}
    Income Frequency: {data.incomeMonthly}
    """

    chat_completions = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        max_tokens=1000,
        temperature=0.8,
        messages=[
            {"role": "system", "content": "You are a financial assistant. Help the user with their financial goals by providing insights based on their income and expenses. Do not use bold letters or '**' characters."},
            {"role": "user", "content": prompt}
        ]
    )

    return {"analysis": chat_completions.choices[0].message.content}
