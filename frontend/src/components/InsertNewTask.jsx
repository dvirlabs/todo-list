import React, { useState } from "react";
import '../style/InsertNewTask.css';
import { createTask } from "../services/tasksTableService";
import { Button, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';




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

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!task.task.trim) {
            toast.error("שדה משימה חדשה חייב להיות מלא");
            return;
        }

        try {
                const response = await createTask(task);
                if (response.message) {
                    toast.success("המשימה נוספה בהצלחה");
                    setTask({
                        task: '',
                        status: '',
                        notes: ''
                    });
                } else {
                    toast.error("המשימה לא נוספה בהצלחה");
                }
        } catch (error) {
            if (error.message === "Status field cannot be empty") {
                toast.error("שדה סטטוס חדשה חייב להיות מלא");
            }
            else if (error.message === "Task field cannot be empty") {
                toast.error("שדה משימה חדשה חייב להיות מלא");
            }
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
                    displayEmpty 
                    placeholder="מצב משימה"
                    sx={{ 
                        width: '110px',
                        height: '39px',
                        marginTop: '7px',
                        marginLeft: '10px',
                        background: 'white',
                        fontSize: '17px',
                        fontFamily: 'Gadi Almog, cursive'
                    }}

                >
                    <MenuItem sx={{ fontSize: '17px', fontFamily: 'Gadi Almog, cursive' }} value="" disabled>סטטוס</MenuItem>
                    <MenuItem value="todo">לעשות</MenuItem>
                    <MenuItem value="in progress">בתהליך</MenuItem>
                    <MenuItem value="done">בוצע</MenuItem>
                </Select>
                <input type="text" name="notes" value={task.notes} onChange={handleChange} placeholder="הערות" />
                <Button type="submit" variant="contained" color="success" style={{ marginLeft: '10px', marginTop: '5px' }} >הוסף משימה</Button>
            </form>
        </div>
    );
};
    
export default InsertNewTask;