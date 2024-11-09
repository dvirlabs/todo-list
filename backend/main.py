from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from db_utils import *
from pydantic import BaseModel

class Task(BaseModel):
    task: str
    status: str
    notes: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/get_all_tasks")
def get_all_tasks():
    return get_todo_table()

@app.post("/add_task")
def add_task(task: Task):
    return insert_task(task.task, task.status, task.notes)

@app.delete("/delete_task/{task_id}")
def remove_task(task_id: int):
    return delete_task(task_id)

@app.put("/update_task/{task_id}")
def modify_task(task_id: int, task: str, status: str, notes: str):
    return update_task(task_id, task, status, notes)






if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)