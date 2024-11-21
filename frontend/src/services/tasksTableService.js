const API_URL = 'http://backend:8000'

export const getTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/get_all_tasks`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
};


export const createTask = async (task) => {
    if (!task.task || task.task.trim() === "") {
        throw new Error("Task field cannot be empty"); // Throw an error when the task field is empty
    }
    if (!task.status || task.status.trim() === "") {
        throw new Error("Status field cannot be empty"); // Throw an error when the status field is empty
    }

    try {
        const response = await fetch(`${API_URL}/add_task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Sending task data as JSON
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_URL}/delete_task/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedData) => {
    console.log(updatedData)
    try {
        const response = await fetch(`${API_URL}/update_task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



export const undoDeleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_URL}/undo_delete_task/${taskId}`, {
            method: 'POST', // Assuming undo is a POST request
        });

        if (!response.ok) {
            throw new Error('Failed to undo delete task');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

