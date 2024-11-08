import React, { useEffect, useState } from "react";
import { getTasks } from "../services/tasksTableService";
import '../style/TodoListTable.css'


const TodoListTable = () => {
    const [data, setData] = useState([]);
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
                    </tr>
                </thead>
                    <tbody>
                        {Array.isArray(data) && data.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.task}</td>
                                <td>{task.status}</td>
                                <td>{task.notes}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
}



export default TodoListTable;