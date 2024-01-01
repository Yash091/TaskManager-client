import axios from "axios";
const url = "http://localhost:8080";

export const register = async(obj) => {
   
    try {
        const user = {
            username:obj.username,
            email:obj.email,
            password:obj.password
        }
    
        const data = await axios.post(`${url}/users/create`,user);
        return data;
    } catch (error) {
        return error.response
    }
}

export const login = async(user) => {
    try {
        const data = await axios.post(`${url}/auth/login`,user);
    return data;
    } catch (error) {
        return error.response
    }
}

export const getAllTasks = async(id, jwtToken) => {
    try {
        const data = await axios.get(`${url}/tasks/${id}`,{
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },withCredentials: true
        })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const addTask = async(task,jwtToken) => {
    try {
        const data = await axios.post(`${url}/tasks/create`,task,
    {headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
        },withCredentials: true
    });
    return data;
    } catch (error) {
        return error.response
    }
}

export const deleteTask = async(id,jwtToken) => {
    try {
        const data = await axios.delete(`${url}/tasks/task/${id}`,{headers: {
            Authorization: `Bearer ${jwtToken}`
            },withCredentials: true
        })
        return data;
    } catch (error) {
        return error.response
    }
}

export const updateTask = async(task,jwtToken,id) => {
    try {
        const data = await axios.put(`${url}/tasks/task/${id}`,task,{headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
            },withCredentials: true
        })
        
        return data;
    } catch (error) {
        return error.response;
    }
}

export const getTaskById = async(id,jwtToken) => {
    try {
        const data = await axios.get(`${url}/tasks/task/${id}`,{
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },withCredentials: true
        });
        
        return data;
    } catch (error) {
        console.log(error)
        return error.response
    }
}