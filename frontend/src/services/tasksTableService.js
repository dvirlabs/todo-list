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

// export const getTask = async (id) => {
//     const response = await fetch(`${API_URL}/tasks/${id}`)
//     const data = await response.json()
//     return data
// }