import axios from "axios";
const url = "http://localhost:8080";

export const register = async(obj) => {
    const user = {
        username:obj.username,
        email:obj.email,
        password:obj.password
    }

    const data = await axios.post(`${url}/users/create`,user);
    console.log(data);
    return data;
}

export const login = async(user) => {
    const data = await axios.post(`${url}/auth/login`,user);
    console.log(data)
    return data;
}

export const getAllTasks = async(id, jwtToken) => {
    const data = await axios.get(`${url}/tasks/${id}`,{
        headers: {
            Authorization: `Bearer ${jwtToken}`,
          },withCredentials: true
    })
    console.log(data)
    return data
}

export const addTask = async(task,jwtToken) => {
    const data = await axios.post(`${url}/tasks/create`,task,
    {headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
        },withCredentials: true
    });
    console.log(data)
    return data;
}

export const deleteTask = async(id,jwtToken) => {
   
    const data = await axios.delete(`${url}/tasks/task/${id}`,{headers: {
        Authorization: `Bearer ${jwtToken}`
        },withCredentials: true
    })
    console.log(data);
    return data;
}

export const updateTask = async(task,jwtToken,id) => {
    const data = await axios.put(`${url}/tasks/task/${id}`,task,{headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
        },withCredentials: true
    })
    console.log(data);
    return data;
}

export const getTaskById = async(id,jwtToken) => {
    const data = await axios.get(`${url}/tasks/task/${id}`,{
        headers: {
            Authorization: `Bearer ${jwtToken}`,
          },withCredentials: true
    });
    console.log(data);
    return data;
}