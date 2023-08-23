import axios from 'axios';

export const getDataApi = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}

export const postDataApi = async (url, post, token) => {
    const res = await axios.post(`url/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

export const patchDataApi = async (url, post, token) => {
    const res = await axios.patch(`url/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

export const deleteDataApi = async (url, post, token) => {
    const res = await axios.delete(`url/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}