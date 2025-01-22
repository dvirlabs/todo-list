from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from db_utils import *
from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    task: str
    status: str
    notes: str
    
class TaskUpdate(BaseModel):
    task: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

app = FastAPI()

# origins = [
#     "http://192.168.10.100",  # Allow frontend IP
#     "http://localhost",       # Allow localhost as well
# ]

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
def modify_task(task_id: int, update_data: TaskUpdate):
     return update_task(task_id, update_data.task, update_data.status, update_data.notes)






if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)