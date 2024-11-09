import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, undoDeleteTask } from "../services/tasksTableService"; // Make sure you have functions for delete and undo
import { Delete, Edit, Undo } from "@mui/icons-material"; // Import icons
import '../style/TodoListTable.css';

const TodoListTable = () => {
    const [data, setData] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]); // To store deleted tasks temporarily
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        // Delete the task and temporarily store it in the deletedTasks state
        const taskToDelete = data.find(task => task.id === taskId);
        setDeletedTasks([...deletedTasks, taskToDelete]);
        setData(data.filter(task => task.id !== taskId));

        // Call the delete task API
        deleteTask(taskId);
    };

    const handleUndoDelete = (task) => {
        // Undo the delete by adding the task back to the table and removed from deletedTasks
        setData([...data, task]);
        setDeletedTasks(deletedTasks.filter(t => t.id !== task.id));

        // Call the undo delete API (you might need to implement this in the backend)
        undoDeleteTask(task.id);
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
                        <th>Actions</th> {/* Column for action buttons */}
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
                                {/* Edit button */}
                                <button className="action-button">
                                    <Edit />
                                </button>

                                {/* Delete button */}
                                <button className="action-button" onClick={() => handleDelete(task.id)}>
                                    <Delete />
                                </button>

                                {/* Undo Delete button */}
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
        </div>
    );
}

export default TodoListTable;
