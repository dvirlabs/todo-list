import React, { useState } from "react";
import '../style/InsertNewTask.css';
import { createTask } from "../services/tasksTableService";
import { Button, Box, Select, MenuItem } from '@mui/material';



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

            console.log(task);
            setTask({
                task: '',
                status: '',
                notes: ''
            });

            console.log(task);
        } catch (error) {
            console.log(error);   
        }
    };

    return (
        <div className="insert-new-task-container" style={{marginTop: '10px', marginBottom: '10px'}}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="task" value={task.task} onChange={handleChange} placeholder="משימה חדשה" />
                <Select
                    type="text" 
                    name="status" 
                    value={task.status} 
                    onChange={handleChange} 
                    placeholder="מצב משימה"
                    sx={{ width: '100px', marginTop: '7px', color: 'white', fontSize: '17px', fontFamily: 'Varela Round, sans-serif' }}

                >
                    <MenuItem value="open">לעשות</MenuItem>
                    <MenuItem value="in-progress">בתהליך</MenuItem>
                    <MenuItem value="done">בוצע</MenuItem>
                </Select>
                <input type="text" name="notes" value={task.notes} onChange={handleChange} placeholder="הערות" />
                <Button type="submit" variant="contained" color="success" style={{ marginLeft: '10px', marginTop: '7px' }} >הוסף משימה</Button>
            </form>
        </div>
    );
};
    
export default InsertNewTask;