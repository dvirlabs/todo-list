import React, { useState } from "react";
import '../style/InsertNewTask.css';
import { createTask } from "../services/tasksTableService";


const InsertNewTask = () => {
    const [task, setTask] = useState({
        task: '',
        status: '',
        notes: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            createTask(task);
            setTask({
                task: '',
                status: '',
                notes: ''
            });
        } catch (error) {
            console.log(error);   
        }
    };

    return (
        <div className="insert-new-task-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="task" value={task.task} onChange={handleChange} placeholder="Task" />
                <input type="text" name="status" value={task.status} onChange={handleChange} placeholder="Status" />
                <input type="text" name="notes" value={task.notes} onChange={handleChange} placeholder="Notes" />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};
    
export default InsertNewTask;