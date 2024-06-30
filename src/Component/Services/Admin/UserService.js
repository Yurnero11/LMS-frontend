import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/admin/users';

export const listUsers = () => {
    const token = localStorage.getItem('token');
    return axios.get(REST_API_BASE_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}


export const createUser = (user) => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);
    return axios.post(`${REST_API_BASE_URL}/addUser`, user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createTeacher = (user) => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);
    return axios.post(`${REST_API_BASE_URL}/addTeacher`, user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateUser = (user) => {
    const token = localStorage.getItem('token');
    console.log('Updating user with token:', token);
    return axios.put(`${REST_API_BASE_URL}/${user.id}`, user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch(error => {
        console.error('Error response:', error.response);
    });
};

export const deleteUser = (userId) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${REST_API_BASE_URL}/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};