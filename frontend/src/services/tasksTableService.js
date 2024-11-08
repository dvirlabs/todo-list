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


// export const getTask = async (id) => {
//     const response = await fetch(`${API_URL}/tasks/${id}`)
//     const data = await response.json()
//     return data
// }