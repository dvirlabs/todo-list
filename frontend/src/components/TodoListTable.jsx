import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, undoDeleteTask, updateTask } from "../services/tasksTableService";
import { Delete, Edit, Undo } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem } from "@mui/material";
import { toast } from 'react-toastify';
import '../style/TodoListTable.css';
import eventEmitter from "./EventEmitter";

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

                    // Listen for taskAdded event to refetch tasks
        const handleTaskAdded = () => {
            console.log('taskAdded event received');
            getTasks()
                .then((data) => {
                    console.log('Fetched tasks after taskAdded event:', data);
                    setData(data);
                })
                .catch((error) => {
                    setError(error);
                });
        };

        eventEmitter.on('taskAdded', handleTaskAdded);

        return () => {
            eventEmitter.removeListener('taskAdded', handleTaskAdded);
        };
    }, []);

    const handleDelete = (taskId) => {
        const taskToDelete = data.find(task => task.id === taskId);
        setDeletedTasks([...deletedTasks, taskToDelete]);
        setData(data.filter(task => task.id !== taskId));
        deleteTask(taskId);
        toast.success('המשימה נמחקה בהצלחה');
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
                toast.success('המשימה עודכנה בהצלחה');
            }
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        const updatedTask = data.find((task) => task.id === taskId);
        if (updatedTask) {
            const response = await updateTask(taskId, { ...updatedTask, status: newStatus });
            if (response.message) {
                setData((prevData) =>
                    prevData.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                );
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
                        {/* <th>id</th> */}
                        <th>משימה</th>
                        <th>מצב</th>
                        <th>הערות</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((task) => (
                        <tr
                            key={task.id}
                            style={{ textDecoration: task.status === "done" ? "line-through" : "none",
                                    backgroundColor: task.status === "done"
                                        ? "green"
                                        : task.status === "in progress"
                                        ? "rgb(206, 177, 245)"
                                        : task.status === "todo"
                                        ? "darkslategrey"
                                        : "transparent"
                             }}
                        >
                            <td>{task.task}</td>
                            <td>
                                <Select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    fullWidth
                                    variant="standard"
                                    style={{ minWidth: "100px", color: "white", fontSize: "25px", fontFamily: 'Gadi Almog, cursive' }}
                                    >
                                    <MenuItem value="todo">לעשות</MenuItem>
                                    <MenuItem value="in progress">בתהליך</MenuItem>
                                    <MenuItem value="done">בוצע</MenuItem>
                                </Select>
                            </td>
                            <td>{task.notes}</td>
                            <td>
                                <Edit color="warning" className="action-button" onClick={() => handleOpenEditDialog(task)} />
                                <Delete color="error" className="action-button" onClick={() => handleDelete(task.id)} />
                                {deletedTasks.some(t => t.id === task.id) && (
                                <button className="action-button" onClick={() => handleUndoDelete(task)}>
                                    <Undo color="info" />
                                </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Task Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
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
                    <Button onClick={handleCloseEditDialog} color="secondary">ביטול</Button>
                    <Button onClick={handleSaveEdit} color="primary">שמור</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoListTable;
