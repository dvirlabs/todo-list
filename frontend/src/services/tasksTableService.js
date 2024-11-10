const API_URL = 'http://localhost:8000'

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
    try {
        const response = await fetch('http://localhost:8000/add_task', {
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

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:8000/delete_task/${taskId}`, {
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
        const response = await fetch(`http://localhost:8000/undo_delete_task/${taskId}`, {
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

