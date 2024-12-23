import React, { useState } from "react";
import '../style/InsertNewTask.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem } from "@mui/material";

export const EditTaskDialog = (isOpen,onClose,onSave,data) => {
    
    const [editedTaskData, setEditedTaskData] = useState({...data});

    // Handle input change for edited task
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTaskData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onClose={()=>onClose()}>
        <DialogTitle>ערוך משימה</DialogTitle>
        <DialogContent>
            <TextField
                label="ערוך משימה"
                name="task"
                value={editedTaskData.task}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            {/* again this select list is all over the place remove it to a component and reuse it */}
            <Select
                label="Status"
                name="status"
                value={editedTaskData.status}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
            >
                <MenuItem value="todo">לעשות</MenuItem>
                <MenuItem value="in progress">בתהליך</MenuItem>
                <MenuItem value="done">בוצע</MenuItem>
            </Select>
            <TextField
                label="ערוך הערות"
                name="notes"
                value={editedTaskData.notes}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>onClose()} color="secondary">ביטול</Button>
            <Button onClick={()=>onSave(editedTaskData)} color="primary">שמור</Button>
        </DialogActions>
    </Dialog>
    );
};