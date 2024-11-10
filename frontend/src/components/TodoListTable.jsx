import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, undoDeleteTask, updateTask } from "../services/tasksTableService";
import { Delete, Edit, Undo } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import '../style/TodoListTable.css';

const TodoListTable = () => {
    const [data, setData] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Edit dialog state
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editedTaskData, setEditedTaskData] = useState({ task: "", status: "", notes: "" });

    useEffect(() => {
        setIsLoading(true);
        getTasks()
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleDelete = (taskId) => {
        const taskToDelete = data.find(task => task.id === taskId);
        setDeletedTasks([...deletedTasks, taskToDelete]);
        setData(data.filter(task => task.id !== taskId));

        deleteTask(taskId);
    };

    const handleUndoDelete = (task) => {
        setData([...data, task]);
        setDeletedTasks(deletedTasks.filter(t => t.id !== task.id));

        undoDeleteTask(task.id);
    };

    // Open edit dialog
    const handleOpenEditDialog = (task) => {
        setCurrentTask(task);
        setEditedTaskData({ task: task.task, status: task.status, notes: task.notes });
        setOpenEditDialog(true);
    };

    // Close edit dialog
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentTask(null);
    };

    // Save the edited task
    const handleSaveEdit = async () => {
        if (currentTask) {
            const updatedTask = { ...currentTask, ...editedTaskData };
            const response = await updateTask(updatedTask.id, editedTaskData);
            if (response.message) {
                // Update data locally after successful response
                setData(data.map(task => (task.id === currentTask.id ? updatedTask : task)));
                handleCloseEditDialog();
            }
        }
    };

    // Handle input change for edited task
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTaskData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>task</th>
                        <th>status</th>
                        <th>notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.task}</td>
                            <td>{task.status}</td>
                            <td>{task.notes}</td>
                            <td>
                                <button className="action-button" onClick={() => handleOpenEditDialog(task)}>
                                    <Edit />
                                </button>
                                <button className="action-button" onClick={() => handleDelete(task.id)}>
                                    <Delete />
                                </button>
                                {deletedTasks.some(t => t.id === task.id) && (
                                    <button className="action-button" onClick={() => handleUndoDelete(task)}>
                                        <Undo />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Task Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task"
                        name="task"
                        value={editedTaskData.task}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Status"
                        name="status"
                        value={editedTaskData.status}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Notes"
                        name="notes"
                        value={editedTaskData.notes}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoListTable;
