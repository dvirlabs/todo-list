const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getTasks = async () => {
    try {
        // do fucking axios for better restAPI connection
        const response = await fetch(`${API_URL}/get_all_tasks`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error);
        return [];
    }
};


export const createTask = async (task) => {
    // remove all those validation to the form
    // use react-form-hook library for that!!!
    // if you cant make it in the component and also 
                //remove all the string to a file with const variable that contain key:value
            // and access that variable no need a lot of string every where
            // change in one place and not in many
    if (!task.task || task.task.trim() === "") {
        throw new Error("Task field cannot be empty"); // Throw an error when the task field is empty
    }
    if (!task.status || task.status.trim() === "") {
        throw new Error("Status field cannot be empty"); // Throw an error when the status field is empty
    }

    try {
        // do fucking axios for better restAPI connection
        const response = await fetch(`${API_URL}/add_task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Sending task data as JSON
        });
        if (!response.ok) throw new Error('Failed to add task');
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
        // do fucking axios for better restAPI connection
        const response = await fetch(`${API_URL}/delete_task/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete task');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedData) => {
    try {
        // do fucking axios for better restAPI connection
        const response = await fetch(`${API_URL}/update_task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



export const undoDeleteTask = async (taskId) => {
    try {
        // do fucking axios for better restAPI connection
        const response = await fetch(`${API_URL}/undo_delete_task/${taskId}`, {
            method: 'POST', // Assuming undo is a POST request
        });

        if (!response.ok) throw new Error('Failed to undo delete task');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};